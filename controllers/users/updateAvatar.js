const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const avatarOriginalname = `${_id}_${originalname}`;
  try {
    // додаємо id в назву, що файли з однаковою назвою не затирались
    const resultUpload = path.join(avatarsDir, avatarOriginalname);
    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", avatarOriginalname);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
