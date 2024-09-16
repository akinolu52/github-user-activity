const URL = 'https://api.github.com/users/<username>/events'


async function getUserActivity(username: string) {
    try {
        const response = await fetch(URL.replace('<username>', username));

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`User: '${username}' not found.`);

            } else {
                throw new Error(`Response status: ${response.status}`);
            }
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
    }
}

function displayUserActivity(events: EventType[]) {
    if (events.length < 1) {
        console.log("No recent activity found.");
        return;
    }

    for (const event of events) {
        const { type, repo, payload } = event;

        const repoName = repo?.name;
        let message = `${type.replace('Event', 'ed')} `

        if (type === "CreateEvent") {
            const { ref, ref_type } = payload;
            message = `Created${ref ? ` ${ref}` : ''} ${ref_type} in ${repoName}`;
        } else if (type === "PushEvent") {
            const commitCount = payload.commits.length
            message += `${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repoName}`
        } else if (type === "WatchEvent") {
            message = `Starred ${repoName}`
        } else if (type === "IssuesEvent") {
            const { action } = payload;
            message += `${action.charAt(0).toUpperCase() + action.slice(1)} an issue in ${repoName}`;
        } else if (type === "ForkEvent") {
            message += `${repoName}`
        } else {
            message += `in ${repoName}`
        }

        console.log(`- ${message}`)
    }

    return true;
}

const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Enter a username to view it activity')
    process.exit(1);
}


getUserActivity(args[0])
    .then(displayUserActivity)
    .catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
