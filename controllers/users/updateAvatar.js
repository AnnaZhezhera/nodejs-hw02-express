const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const avatarSmallOriginalname = `${_id}_small_${originalname}`;
  try {
    // додаємо id в назву, що файли з однаковою назвою не затирались
    const resultUploadSmall = path.join(avatarsDir, avatarSmallOriginalname);

    await Jimp.read(tmpUpload).then((img) => {
      return img.resize(250, 250).write(resultUploadSmall);
    });

    const avatarURL = path.join("public", "avatars", avatarSmallOriginalname);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
