const cron = require("node-cron");
const models = require("../models/index");
const { Op } = require("sequelize");

async function expireHashes() {
  console.log("Worker started");

  const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const upHash = null;

  await models.User.update(
    {
      hash: upHash,
    },
    {
      where: {
        updatedAt: {
          [Op.lt]: expirationTime,
        },
      },
    }
  );
  console.log(`Updated ${expiredHashes[0]} expired hashes to null.`);
}

cron.schedule("* * * * *", () => {
  expireHashes();
});
