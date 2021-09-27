# scrummaster-discord

Github action to determine a team's scrummasters and post it in the team discord.

## parameters

team: a JSON string with and array of string of team member names (minimum 2).  
webhook: a discord webhook in the form of an URL.
> :warning: **Warning:** You should keep the webhook as a github secret.

## examples

team: "["Octo", "Cat"]"  
webhook: https://discord.com/api/webhooks/32192256368640/aagaxz2cWHb-RfO0iO3fXJKrvMUaY11dsupZHr9_vYCJXs7n5GSpEn
