const core = require("@actions/core");
const github = require("@actions/github");
const Discord = require("discord.js");

try {
  const team = JSON.parse(core.getInput("team"));
  const webhook = core.getInput("webhook").split("/");
  const githubRunNumber = process.env.GITHUB_RUN_NUMBER;
  const githubRunID = process.env.GITHUB_RUN_ID;
  const scrumMasters = determineScrumMasters(
    team,
    githubRunNumber,
    githubRunID
  );
  messageDiscord(webhook, scrumMasters);
} catch (error) {
  core.setFailed(error.message);
}

function determineScrumMasters(team, number, variance = 1) {
  const scrumMasterOne = team.splice(number % team.length, 1);
  const scrumMasterTwo = team.splice((number + variance) % team.length);
  let scrumMasters = scrumMasterOne.concat(scrumMasterTwo);
  return scrumMasters;
}

function messageDiscord(webhook, scrumMasters) {
  const webhookClient = new Discord.WebhookClient(
    webhook[webhook.length - 2],
    webhook.length - 1
  );

  const embed = new Discord.MessageEmbed()
    .setTitle("New Scrum Masters for our team")
    .setColor("#0099ff")
    .addField("First", scrumMasters[0])
    .addField("Second", scrumMasters[1]);

  webhookClient.send("Webhook test", {
    username: "Github Action",
    avatarURL: "https://i.imgur.com/wSTFkRM.png",
    embeds: [embed],
  });
}
