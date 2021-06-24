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
  core.setOutput("masters", JSON.stringify(scrumMasters));
  console.log(githubRunID);
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
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
    webhook[webhook.length - 1]
  );

  const embed = new Discord.MessageEmbed()
    .setTitle("New Scrum Masters for our team")
    .setColor("#211a52")
    .setAuthor("AAU-Dat")
    .setDescription("Bow to your new overlords")
    .addFields(
      { name: "First Master", value: scrumMasters[0], inline: true },
      { name: "Second Master", value: scrumMasters[1], inline: true }
    )
    .setFooter("Generated by Github Action AAU-dat/scrummaster-discord");

  webhookClient.send({
    username: "Github Action",
    avatarURL: "https://i.imgur.com/wSTFkRM.png",
    embeds: [embed],
  });
}
