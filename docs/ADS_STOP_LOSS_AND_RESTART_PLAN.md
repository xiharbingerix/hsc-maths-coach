# Paid Ads Stop-Loss and Restart Plan

Created: June 2026

## Executive Summary

Nova Maths has spent about $350 over roughly 3 weeks with hundreds of clicks and no reliable trial conversion. Because `payment_success` was recently fixed so it only fires after a verified checkout session, historical Google Ads conversion data may be polluted by old unverified `/payment-success` visits.

Do not scale spend until fresh traffic proves clean `trial_started` or verified checkout completion events. Treat all pre-fix `payment_success` conversion history as suspect for bidding and optimisation.

## Data Availability

Live Google Ads access was not available from the local workspace: no Google Ads API credentials were present and no account export was available locally.

This plan is therefore a triage plan plus exact manual Google Ads checklist. Once exports are available, use the same pause/keep rules below to classify each campaign, ad group, keyword and search term.

## Pull This From Google Ads

Export the last 30 days and the last 7 days separately.

### Campaigns

- Campaign name
- Campaign type
- Status
- Daily budget
- Bid strategy
- Cost
- Clicks
- Impressions
- CTR
- Average CPC
- Conversions by conversion action
- Cost per conversion
- Search impression share
- Search lost IS budget
- Search lost IS rank
- Landing page

### Ad Groups

- Campaign
- Ad group
- Status
- Cost
- Clicks
- Impressions
- CTR
- Average CPC
- Conversions by conversion action
- Cost per conversion

### Keywords

- Campaign
- Ad group
- Keyword
- Match type
- Status
- Cost
- Clicks
- Impressions
- CTR
- Average CPC
- Quality score
- Conversions by conversion action
- Final URL

### Search Terms

- Campaign
- Ad group
- Search term
- Matched keyword
- Match type
- Cost
- Clicks
- Impressions
- CTR
- Average CPC
- Conversions by conversion action

### Segments

- Device: mobile, desktop, tablet
- Location: state, city, suburb where available
- Day of week
- Hour of day
- Network: Google Search vs Search Partners

### Conversion Actions

For every conversion action:

- Name
- Source
- Category
- Primary vs secondary
- Included in account-default goals
- Counting: one vs every
- Attribution model
- Conversion window
- Recent conversions
- Tag diagnostics status
- Whether it fired before the verified `/payment-success` fix

## Immediate Pause Recommendation

Pause all campaigns now unless they meet every condition below:

- Search only; no Display, Performance Max, YouTube, Demand Gen or Search Partners.
- Exact or tight phrase match only.
- Query intent is explicitly paid online HSC maths tutoring, HSC maths course, Year 12 maths tutoring, or online maths tutor.
- Landing page is the paid trial page or a highly relevant course page.
- It has no evidence of polluted conversion optimisation.

If that leaves nothing, keep nothing live. A total pause is preferable to teaching Google Ads on broken or low-intent signals.

## Likely Wasted Intent To Exclude

The following intent clusters are poor fits for a paid trial and should be excluded aggressively:

- Free worksheets
- NESA syllabus
- Textbook answers and worked solutions
- Calculator tools
- Jobs, salary, careers
- Classroom resources for teachers
- Broad tutoring research without buying intent
- General study tips
- Free past papers without tutoring/course intent
- University maths
- Primary school or non-HSC year levels unless deliberately targeted

## Negative Keyword List

Add as phrase negatives unless noted. Use exact negatives only if a term could have a valid paid-intent variant.

```text
free
free worksheet
free worksheets
worksheet
worksheets
pdf
download
printable
answers
answer key
solutions
worked solutions
textbook answers
cambridge answers
maths in focus answers
fitzpatrick answers
excel answers
past paper answers
nesa
syllabus
formula sheet
reference sheet
calculator
math calculator
graphing calculator
desmos
wolfram
symbolab
jobs
job
salary
teacher salary
tutor jobs
maths jobs
teaching jobs
classroom
teacher resources
lesson plan
lesson plans
resources for teachers
school resources
games
activities
primary
year 7
year 8
year 9
year 10
university
degree
course outline
```

Add these if search-term exports show irrelevant research intent:

```text
what is
definition
examples
reddit
reviews
cheap
free trial no card
```

## Conversion Tracking Issues

Current code condition: `payment_success` and `trial_started` are now rendered only after the server verifies a Stripe checkout session and resolves an offer. Unverified `/payment-success` visits render "Checkout not verified" and should not fire `TrackPaymentSuccess`.

Google Ads risk: any historical conversion action that counted old unverified `/payment-success` visits is polluted. Do not optimise bidding from that history.

Recommended Google Ads configuration:

- Make verified `trial_started` or verified checkout completion the only primary conversion for bidding.
- If using the existing Google Ads purchase conversion action, rename it or document the fix date in Google Ads notes.
- Set old unverified `payment_success` conversion actions to secondary or remove them from account-default goals.
- Keep `trial_cta_clicked`, `checkout_started`, and `checkout_redirected_to_stripe` as secondary observation only.
- Do not use CTA clicks as primary conversions. They are useful diagnostics, not business outcomes.
- Use one-count conversion counting for trial starts.
- Exclude test conversions and any admin test conversion action from bidding.
- Segment all reports by conversion action name before judging performance.

## What To Keep, If Anything

Keep only a small Search test if Google Ads confirms the conversion action is clean:

- Campaign type: Search only
- Networks: Google Search only; Search Partners off
- Location: NSW only to start
- Devices: do not exclude initially, but cap/observe by device; pause device segments after 50+ clicks with no checkout starts
- Keywords: exact and phrase only
- Landing page: `/hsc-maths` or the most relevant course page
- Conversion goal: verified `trial_started` or verified checkout completion only

Seed keyword themes:

```text
"hsc maths tutor online"
"year 12 maths tutor online"
"hsc advanced maths tutor"
"hsc standard maths tutor"
"online hsc maths tutoring"
[hsc maths tutor online]
[year 12 maths tutor online]
[hsc advanced maths tutor]
[hsc standard maths tutor]
```

Pause all broad match until there are at least 5 to 10 verified trials from clean traffic.

## Budget Recommendation

Immediate budget: $0/day until conversion actions are cleaned and old polluted actions are excluded from bidding.

Restart budget after cleanup: maximum $10/day total, not per campaign.

Hard stop-loss:

- Stop after $100 spend with 0 verified `trial_started`.
- Stop after 100 paid clicks with 0 verified `checkout_started`.
- Stop any ad group after 30 clicks with 0 `trial_cta_clicked`.
- Stop any search term after $10 spend or 5 clicks if it is not clearly paid-intent.
- Stop any keyword after 25 clicks with no checkout start unless search terms are pristine.

Do not increase budget until there are at least:

- 3 verified trial starts from fresh post-fix traffic, and
- no unverified `payment_success` conversions in Google Ads diagnostics, and
- search-term waste is under 20% of spend.

## Restart Test Structure

Create a new clean campaign rather than reusing a campaign optimised on polluted conversion data.

### Campaign 1: HSC Maths Tutor - Exact

- Daily budget: $5
- Match types: exact only
- Target: NSW
- Network: Google Search only
- Bid strategy: Maximise clicks with CPC cap, or manual CPC if available
- Max CPC: conservative; start around $1.50 to $2.50 and adjust only after search terms are clean
- Primary conversion: verified `trial_started` or verified checkout completion

### Campaign 2: HSC Maths Tutor - Phrase

- Daily budget: $5
- Match types: phrase only
- Same conversion and network settings
- Use this only if exact match volume is too low

Do not run Performance Max, Display, Demand Gen, YouTube, dynamic search ads, or broad match during the proof period.

## Manual Triage Rules

When the Google Ads export is available:

- Pause any campaign with more than $50 spend and zero verified trial starts.
- Pause any ad group where more than 30% of spend is on free/resource/syllabus/calculator intent.
- Pause any keyword with broad match unless it has a verified trial from clean post-fix traffic.
- Pause any location with more than 25 clicks and no checkout start.
- Pause any device segment with more than 75 clicks and no checkout start, unless another device is also failing equally.
- Keep only search terms where a parent would plausibly pay for online HSC maths support within the next 7 days.

## Reporting Cadence

During restart:

- Check search terms daily.
- Add negatives daily.
- Compare Google Ads conversions with internal `trial_started` and `payment_success`.
- Segment by conversion action every time.
- Keep a manual log of spend, clicks, checkout starts, verified trials, and notes.

Stop the test if clean conversion proof does not appear quickly. The goal is not traffic; the goal is verified paid-intent trial starts.
