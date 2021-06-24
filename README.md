# scrummaster-discord

Github action to determine a team's scrummasters and post it in the team discord.

## parameters

team should be a JSON string with an array of strings, with minimum 2 members.

team: "["Octo", "Cat"]"

webhook should be a discord webhook in the form of an URL.

### examples

team: "["Octo", "Cat"]"

webhook: https://discord.com/api/webhooks/32192256368640/aagaxz2cWHb-RfO0iO3fXJKrvMUaY11dsupZHr9_vYCJXs7n5GSpEn
