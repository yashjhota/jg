Inspect the current Git working tree, then prepare a commit only after getting the user's approval.

- Run `git status` and review the relevant diffs. Do not change any files.
- Summarize the changes and propose a concise commit message.
- Ask the user to approve the specific files to stage and the proposed commit message. Do not stage or commit before explicit approval.
- Once approved, run `git add` only for the approved files, then commit with the approved message. Avoid broad staging commands such as `git add .` and `git add -A` unless explicitly approved.
- If approval is declined or not provided, do not stage or commit anything. Report the outcome.
