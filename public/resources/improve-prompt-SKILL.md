---
name: improve-prompt
description: Use when the user invokes /improve-prompt, or asks to improve, enrich, rephrase or "make more professional" a prompt or a short request before running it. Also when they type a vague one-line instruction ("analyse this website", "improve the onboarding") and want it turned into a complete prompt with an expert role.
argument-hint: <request in plain language>
---

# Improve a prompt before running it

Turns a short, vague request into a complete prompt with an expert role, objective, context and quality criteria. Then shows it, asks for confirmation and runs it.

**Principle:** you always deliver an improved prompt. You never reply with questions alone.

## Step 0: the request

The request is `$ARGUMENTS`. If it is empty, ask the user to write it and stop.

## Step 1: quick context (3 reads at most)

Look only at what helps make the prompt concrete:

- The current folder and its `CLAUDE.md` if there is one (stack, conventions).
- Files, folders or URLs the request names explicitly.
- If there is git, the current branch and `git log --oneline -5`.

Do not explore the whole repo. If there is no project, skip this step.

## Step 2: ambiguity

Ask **only** if there are two or more reasonable readings that change the **expert role** or the **deliverable**. Example: "analyse this website" could mean UX, SEO, copy or performance.

- One single question, using `AskUserQuestion`, with 2 to 4 options, the most likely first and marked as recommended.
- If there is only one reasonable reading, do not ask: infer the role and move on.
- If a concrete input is missing (URL, file, recipient), do **not** ask for it: leave a placeholder like `[website URL]` in the prompt and ask for it in step 4.

Never fire several open questions in a row. That is what an agent without this skill does.

## Step 3: the rewrite

Write the improved prompt in the **same language** as the request, with this structure:

```
Act as [a concrete expert role, with seniority and specialty].

Objective: [what the user wants to achieve, in one sentence].

Context: [what you know about the project, the website, the recipient. If nothing, omit the section].

Steps:
1. [...]
2. [...]

Quality criteria:
- [what separates an excellent result from a mediocre one for this role]

Output format: [structure, length, language].

Constraints: [what not to do, scope limits].
```

Rules:

- Respect the original intent. Do not add requirements the user did not ask for.
- Do not invent facts about the business, the website or the recipient. Use `[bracketed]` placeholders for what is missing.
- If the request is already well formed, say so and make minimal changes.
- If the request is long, organise it into this structure without inflating it.
- Omit any section that adds nothing in that specific case.

## Step 4: show and confirm

Show the improved prompt in a code block. Below it, one line with the chosen role and why. If there are placeholders, ask for those values here.

Then use `AskUserQuestion` with these three options:

1. **Run** (recommended): execute the prompt as is.
2. **Adjust**: the user says what to change; rewrite and come back to this step.
3. **Copy only**: run nothing. Stop.

Never run without passing through here.

## Step 5: run

Treat the improved prompt as if the user had typed it. Before starting, check whether a specialised skill fits (for example `cro`, `seo-audit`, `copywriting`, `systematic-debugging`) and invoke it.

## Example

Request: `/improve-prompt write an email to clients who haven't paid`

No role ambiguity (it is overdue-invoice collection). No project open. Result:

```
Act as a senior collections and client retention lead, experienced in B2B communication that is firm but cordial.

Objective: write a payment reminder email that gets the invoice paid without damaging the relationship.

Context: [company and sector], invoice overdue by [N days], [first reminder / second reminder].

Steps:
1. A clear subject line that names the invoice and does not read as a threat.
2. A brief reminder of the amount, invoice number and due date.
3. How to pay, and who to contact if it is already paid or there is a dispute.
4. A cordial close with a specific deadline.

Quality criteria:
- Under 150 words.
- Professional tone, no blame and no over-apologising.
- One single call to action.

Output format: subject line + email body, in English.

Constraints: do not offer discounts or payment plans unless the user asks.
```

Role chosen: collections lead, because the request is about invoicing, not marketing. Missing: company, days overdue, and whether this is the first reminder.

## Common mistakes

| Mistake | Fix |
|---|---|
| Replying with 3 or 4 open questions and no prompt | Infer, write the prompt with placeholders, ask one thing only if needed |
| Refusing to draft "until there is more context" | The improved prompt is the deliverable; the gaps go in brackets |
| Inflating a simple request into ten sections | Omit the sections that add nothing |
| Running directly without showing the prompt | Always pass through step 4 |
| Reading half the repo "for context" | 3 reads at most, only what the request names |
| Changing the user's language or objective | Same language, same intent |
