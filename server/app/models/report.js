const mongoose = require('mongoose');


/* Report schema defination */
const ReportSchema = new mongoose.Schema({
    journalistId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Journalist' },
    mediaUrl: { type: String },
    text: { type: String }
});

const Report = mongoose.model('Report', ReportSchema);

/* CRUD functions for the schema defined above */
module.exports.saveReport = (reportInfo, callback) => {
  const report = new Report();
  report.journalistId = reportInfo.journalistId;
  report.mediaUrl = reportInfo.mediaUrl; //TODO: add it to aws
  report.text = reportInfo.text;

  report.save((error, savedreport) => {
      callback(error, savedreport);
  });
};

module.exports.findByUserId = (journalistId, callback) => {
    Report.find({ journalistId }, (error, reports) => {
        callback(error, reports)
    });
};
