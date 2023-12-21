const JournalTextModel = require("../Models/UserModel");

const DeleteJournal = async (req, res) => {
    try {
      await JournalTextModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = DeleteJournal;