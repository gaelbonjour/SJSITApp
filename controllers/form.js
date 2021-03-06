import moment from "moment-timezone";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Event, Form, Season } from "models";
import {
  convertId,
  createDate,
  generateFilters,
  getStartOfDay,
  sendError,
} from "shared/helpers";
import {
  expiredForm,
  formAlreadyExists,
  invalidExpirationDate,
  // invalidSendDate,
  invalidSendEmailNoteDate,
  missingFormId,
  missingIds,
  unableToCreateNewForm,
  unableToLocateEvents,
  unableToDeleteForm,
  unableToLocateForm,
  unableToLocateSeason,
  unableToUpdateApForm,
  unableToUpdateForm,
} from "shared/authErrors";

/**
 * Creates a new form.
 *
 * @function createForm
 * @returns {string} - message
 * @throws {string}
 */
const createForm = async (req, res) => {
  try {
    const {
      expirationDate,
      enrollMonth,
      notes,
      sendEmailNotificationsDate,
      seasonId,
    } = req.body;

    if (!seasonId || !expirationDate || !enrollMonth)
      throw unableToCreateNewForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const [startMonth, endMonth] = enrollMonth;
    const existingForms = await Form.find({
      startMonth: { $gte: startMonth },
      endMonth: { $lte: endMonth },
    });
    if (!isEmpty(existingForms)) throw formAlreadyExists;

    const sendEmailsDate = createDate(sendEmailNotificationsDate).format();
    const currentDay = getStartOfDay();

    if (expirationDate < currentDay) throw invalidExpirationDate;
    if (sendEmailsDate < currentDay) throw invalidSendEmailNoteDate;

    await Form.create({
      seasonId,
      startMonth,
      endMonth,
      expirationDate,
      notes,
      sendEmailNotificationsDate: sendEmailsDate,
    });

    res.status(201).json({ message: "Successfully created a new form!" });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Deletes a form.
 *
 * @function deleteForm
 * @returns {string} - message
 * @throws {string}
 */
const deleteForm = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id });
    if (!existingForm) throw unableToDeleteForm;

    await existingForm.delete();

    res.status(200).json({ message: "Successfully deleted the form." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Deletes many events.
 *
 * @function deleteManyForms
 * @returns {string} - message
 * @throws {string}
 */
const deleteManyForms = async (req, res) => {
  try {
    const { ids } = req.body;
    if (isEmpty(ids)) throw missingIds;

    await Form.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Successfully deleted the forms." });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Retrieves all forms for ViewForms page.
 *
 * @function getAllForms
 * @returns {object} - sorted forms and total form documents
 * @throws {string}
 */
const getAllForms = async (req, res) => {
  try {
    const { page } = req.query;

    const filters = generateFilters(req.query);

    const results = await Form.paginate(
      { ...filters },
      {
        sort: { startMonth: -1 },
        page,
        limit: 10,
        select: "-notes -__v",
      },
    );

    const forms = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    res.status(200).json({ forms, totalDocs });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, res);
  }
};

/**
 * Retrieves a single form for editing/viewing.
 *
 * @function getForm
 * @returns {object} - form
 * @throws {string}
 */
const getForm = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0 });
    if (!existingForm) throw unableToLocateForm;

    res.status(200).json({ form: existingForm });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Resend all form reminder emails.
 *
 * @function resendFormEmail
 * @returns {string} - message
 * @throws {string}
 */
const resendFormEmail = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0 });
    if (!existingForm) throw unableToLocateForm;

    await existingForm.updateOne({
      sendEmailNotificationsDate: createDate().format(),
      sentEmails: false,
    });

    res.status(200).json({
      message: "Email notifications for that form will be resent shortly.",
    });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Updates an form's details.
 *
 * @function updateForm
 * @returns {string} - message
 * @throws {string}
 */
const updateForm = async (req, res) => {
  try {
    const {
      _id,
      expirationDate,
      enrollMonth,
      notes,
      seasonId,
      sendEmailNotificationsDate,
    } = req.body;

    if (!_id || !seasonId || !expirationDate || !enrollMonth)
      throw unableToUpdateForm;

    const seasonExists = await Season.findOne({ seasonId });
    if (!seasonExists) throw unableToLocateSeason;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    const [startMonth, endMonth] = enrollMonth;
    const existingForms = await Form.find({
      _id: { $ne: formExists._id },
      startMonth: { $gte: startMonth },
      endMonth: { $lte: endMonth },
    });
    if (!isEmpty(existingForms)) throw formAlreadyExists;

    const format = "MM/DD/YY";
    const { sentEmails } = formExists;

    // incoming email notification date
    const incomingSendEmailsDate = createDate(
      sendEmailNotificationsDate,
    ).format(format);

    // current form email date
    const currentSendEmailsDate = createDate(
      formExists.sendEmailNotificationsDate,
    ).format(format);

    // resend emails if the dates don't match and they were already sent
    const emailNotificationStatus =
      incomingSendEmailsDate === currentSendEmailsDate && sentEmails;

    await formExists.updateOne({
      seasonId,
      startMonth,
      endMonth,
      expirationDate,
      notes,
      sendEmailNotificationsDate: incomingSendEmailsDate,
      sentEmails: emailNotificationStatus,
    });

    res.status(201).json({ message: "Successfully updated the form!" });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Updates an event's 'eventResponses'.
 *
 * @function updateApForm
 * @returns {string} - message
 * @throws {string}
 */
const updateApForm = async (req, res) => {
  try {
    const { _id, responses } = req.body;
    if (!_id || !responses) throw unableToUpdateApForm;

    const formExists = await Form.findOne({ _id });
    if (!formExists) throw unableToLocateForm;

    const { id: userId } = req.session.user;

    await Event.bulkWrite(
      responses.map(response => {
        const { id: eventId, value, notes, updateEvent } = response;

        const filter = updateEvent
          ? {
              _id: eventId,
              "employeeResponses._id": userId,
            }
          : {
              _id: eventId,
            };

        const update = updateEvent
          ? {
              $set: {
                "employeeResponses.$.response": value,
                "employeeResponses.$.notes": notes,
              },
            }
          : {
              $push: {
                employeeResponses: {
                  _id: userId,
                  response: value,
                  notes,
                },
              },
            };

        return {
          updateOne: {
            filter,
            update,
          },
        };
      }),
    );

    res
      .status(201)
      .json({ message: "Successfully added your responses to the A/P form!" });
  } catch (err) {
    return sendError(err, res);
  }
};

/**
 * Retrieves an AP form and all events existing within its start and end months.
 *
 * @function viewApForm
 * @returns {object} - form and events
 * @throws {string}
 */
const viewApForm = async (req, res) => {
  try {
    const { id: userId } = req.session.user;
    const { id: _id } = req.params;
    if (!_id) throw missingFormId;

    const existingForm = await Form.findOne({ _id }, { __v: 0, seasonId: 0 });
    if (!existingForm) throw unableToLocateForm;

    const { expirationDate } = existingForm;
    const currentDate = moment().toDate();
    const expiredDate = moment(expirationDate).toDate();
    if (currentDate >= expiredDate) {
      throw expiredForm(
        moment(expirationDate).format("MMMM Do, YYYY @ hh:mma"),
      );
    }

    const startMonth = moment(existingForm.startMonth);
    const endMonth = moment(existingForm.endMonth);

    const events = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: startMonth.toDate(),
            $lte: endMonth.toDate(),
          },
        },
      },
      { $sort: { eventDate: 1 } },
      {
        $project: {
          location: 1,
          team: 1,
          opponent: 1,
          eventDate: 1,
          eventType: 1,
          notes: 1,
          employeeResponse: {
            $filter: {
              input: "$employeeResponses",
              as: "employeeResponse",
              cond: { $eq: ["$$employeeResponse._id", convertId(userId)] },
            },
          },
        },
      },
    ]);

    if (isEmpty(events))
      throw unableToLocateEvents(startMonth.format("L"), endMonth.format("L"));

    res.status(200).json({
      form: existingForm,
      events,
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export {
  createForm,
  deleteForm,
  deleteManyForms,
  getAllForms,
  getForm,
  resendFormEmail,
  updateForm,
  updateApForm,
  viewApForm,
};
