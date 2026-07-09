# PSAT Roots Book — Content to Paste In

Copy each block into the matching section of the Google Doc. Bold the lines marked **bold**; leave the rest as normal body text. The italic "(Add … problems here)" lines are just placeholders — delete them once you drop your problems in.

---

## 1) PERCENTS — Lesson 4B, Part 1 of 5
*(replace the current teaching text)*

Break the word apart and it tells you exactly what to do. PER means divide (miles per hour = miles ÷ hours). CENT means 100 (a CENTury is 100 years; a CENT is 1/100 of a dollar). So PERCENT literally means "per 100" — divide by 100.

**A percent is just a number over 100**

40% means 40 per 100 = 40/100. Written three ways, all the same value: 40% = 40/100 = 0.40.

To turn a percent into a decimal, divide by 100 (move the decimal two places left): 40% → 0.40, 7% → 0.07, 125% → 1.25.

**The one setup that solves them all:  part / whole = x / 100**

Almost every percent question is really this proportion with one piece missing. They give you two numbers; you solve for the third.

- What is 30% of 80?   →   part / 80 = 30 / 100   →   part = 24
- 12 is what percent of 48?   →   12 / 48 = x / 100   →   x = 25
- 18 is 40% of what number?   →   18 / whole = 40 / 100   →   whole = 45

**"of" means multiply**

Whenever you see "X% of Y," the word "of" is telling you to multiply. Turn the percent into a decimal and multiply: X% of Y = (X/100) · Y. So 30% of 80 = 0.30 × 80 = 24 — same answer, fewer steps.

**Do it in Desmos**

Type the proportion with the x right in it — 12/48 = x/100 — and Desmos solves for x. Or go straight at it: for the part, type 0.30*80; for the percent, type 12/48 and read the decimal (0.25 = 25%).

**Percent CHANGE uses the same setup**

change / original = x / 100. The starting value is always the whole. (From 50 up to 60: change = 10, original = 50 → 10/50 = 20% increase.)

*(Add 2–3 PSAT percent problems here.)*

---

## 2) EXPONENTIAL GROWTH — Lesson 4B, Part 4 of 5
*(replace the current teaching text)*

Linear change ADDS the same amount every step. Exponential change MULTIPLIES by the same amount every step — that's why it starts slow, then explodes. The test's favorite formula:

**y = a(1 ± r)^t**

Read it one piece at a time:

- a = the STARTING amount — what you have at t = 0, before anything changes.
- r = the rate of change as a decimal (7% → 0.07).
- t = how many steps have gone by (years, months, …).
- (1 ± r) = the MULTIPLIER — the piece that does all the work.

**Why the 1? It's your 100% baseline**

The 1 stands for 100% of what you already have — you always keep that. Then you adjust:

- Increase by 7%: keep 100% AND add 7% → 1 + 0.07 = 1.07. The multiplier is BIGGER than 1, so the amount grows.
- Decrease by 7%: keep 100% but LOSE 7% → 1 − 0.07 = 0.93. The multiplier is LESS than 1, so the amount shrinks.

Gut check: multiplier > 1 → growing; multiplier < 1 → shrinking. If a 7% increase ever gives you 1.7, you know it's wrong.

**Putting it together**

$1,300 growing 7% a month: a = 1300, r = 0.07, multiplier 1.07 → y = 1300(1.07)^t. A $20,000 car losing 15% a year: y = 20000(0.85)^t.

**Desmos check**

Type the equation and look at t = 0 — you should get a back. Step t to 1 and confirm the output equals a × the multiplier. If it matches, the formula is right.

*(Add 2–3 PSAT exponential-growth problems here.)*

---

## 3) MODIFIERS — Lesson 3A, Part 6 of 6
*(replace the current teaching text; word salad kept)*

A modifier is a word or phrase that describes something else. The golden rule: a modifier has to sit RIGHT NEXT TO the thing it describes. Break that rule and you get word salad — a sentence with all the right words that says something ridiculous.

**The word salad**

"Running to catch the bus, my backpack flew open." Read it literally: the backpack is running to catch the bus. That's the salad. The opening phrase "Running to catch the bus" describes whoever was running — but the first thing after the comma is "my backpack," so the sentence hands the running to the backpack.

More salad: "Covered in melted cheese, I devoured the nachos." (I'm covered in cheese?) "After rotting for weeks, my roommate finally threw out the leftovers." (Your roommate rotted for weeks?)

**The fix: who is actually doing it?**

When a sentence opens with a describing phrase and a comma, the very next thing must be the person or thing that phrase is about. Ask: WHO is running / covered in cheese / rotting?

- Running to catch the bus, I felt my backpack fly open. ✓  (I was running.)
- Covered in melted cheese, the nachos disappeared in seconds. ✓  (The nachos were covered.)

**How it shows up on the test**

The opening phrase is fixed, and the four answer choices are four different ways to start the main sentence. Your job: pick the choice that names the thing the phrase is actually describing. Cross off any choice that makes word salad — even if it "sounds" fine.

Pro tip: read the opening phrase, then say out loud "WHO or WHAT is doing this?" Whatever answers that question has to come right after the comma.

*(Add 2–3 PSAT modifier problems here.)*

---

# GEOMETRY RESTRUCTURE — Lesson 3B

**First, fix the three headers (title + time):**

| Part | Change the title to… | Change the time to… |
|------|----------------------|---------------------|
| Part 2 of 5 | **Area, Surface Area & Volume** | 15 minutes |
| Part 3 of 5 | **Degrees & Angles** | 12 minutes |
| Part 4 of 5 | **Radians** | 10 minutes |

Part 1 (Triangles) and Part 5 (Circles) stay exactly as they are.

---

## 4a) AREA, SURFACE AREA & VOLUME — Lesson 3B, Part 2 of 5
*(replace the old "Area" teaching text — this now also covers volume)*

This part bundles the three "how much space" measurements. Area is flat space (2-D). Volume is space filled up (3-D). Surface area is the skin wrapped around a 3-D shape. Good news: the reference sheet at the front of every math section gives you almost all of these — your job is knowing which one to grab.

**Area (flat, 2-D) — measured in SQUARE units**

- Rectangle: length × width
- Triangle: ½ × base × height
- Circle: π r²   (r = radius, half the diameter)

**Surface area — you only need to GET it, not grind it**

Surface area is the area of every face of a solid added together — picture the wrapping paper it takes to cover the shape with no gaps or overlaps. The SAT and PSAT almost never ask you to calculate surface area from scratch, so don't memorize formulas for it. Just understand the idea: a 2 × 3 × 4 box has a surface area equal to the areas of all six rectangular faces added up. That concept is all you need.

**Volume (filled up, 3-D) — measured in CUBIC units**

Most volumes follow one pattern: area of the base × how tall it is.

- Box / rectangular prism: length × width × height
- Cylinder: (π r²) × height — the circle base times the height
- The reference sheet also gives cones, spheres, and pyramids. Don't memorize them — look them up when a problem needs them.

**The trap: match your units**

Area comes out in square units (ft²), volume in cubic units (ft³). If an answer's units don't match what the question asked for, it's wrong.

*(Add 2–3 PSAT area/volume problems here.)*

---

## 4b) DEGREES & ANGLES — Lesson 3B, Part 3 of 5
*(replace the old "Volume" teaching text — this slot is now angles)*

Angles are measured in degrees, and almost every angle problem comes down to a few sums that always hold. Find the angles you know, and the missing one falls out.

**The numbers that never change**

- A straight line = 180°. Angles sitting on one side of a straight line add up to 180°.
- A full circle (all the way around a point) = 360°.
- The three angles inside ANY triangle add up to 180°.

**Angle pairs**

- Vertical angles (the X made by two crossing lines): the angles across from each other are EQUAL.
- Supplementary angles add to 180°; complementary angles add to 90°.

**Parallel lines cut by a transversal**

When one line crosses two parallel lines, only two angle sizes exist in the whole picture, and they add to 180°. Angles in the same position (or diagonal from each other) are EQUAL; any two that aren't equal are supplementary. On the test: find one angle, and every other angle is either that same number or 180° minus it.

**How to attack it**

Label every angle you can figure out, one fact at a time, until you reach the one they asked for. You almost never need a formula — just the sums above.

*(Add 2–3 PSAT angle problems here.)*

---

## 4c) RADIANS — Lesson 3B, Part 4 of 5
*(replace the old "Degrees & Radians" teaching text — this slot is now radians only)*

A radian is just another unit for measuring angles — like measuring the same distance in feet OR inches. Degrees and radians describe the exact same angle; they're two languages for it. So switching between them is nothing more than a unit conversion.

**The one conversion fact**

180° = π radians. That's the whole thing. (A full circle is 360° = 2π radians.)

**Convert by multiplying by 1**

Remember from unit conversion: any true equation can be written as a fraction equal to 1, and multiplying by 1 changes the units without changing the value. From 180° = π radians you get two versions of 1:

π radians / 180°     and     180° / π radians

Pick the one that cancels the unit you DON'T want:

- Degrees → radians: 90° × (π radians / 180°) = π/2 radians.  (The "degrees" cancel.)
- Radians → degrees: (π/3 radians) × (180° / π radians) = 60°.  (The "radians" cancel.)

**Desmos note**

Desmos can work in either mode, but for PSAT problems you usually just apply the conversion above. Set it up so the unit you're getting rid of sits on the bottom — exactly like turning feet into inches.

*(Add 1–2 PSAT radian problems here.)*

---

# 5) 3A EXTRA EXAMPLES
*(ADD these to the end of each section — don't delete anything)*

## Parts of Speech — Lesson 3A, Part 1 of 6

**Quick examples**

Nouns are people, places, things, or ideas: teacher, Chicago, pencil, freedom. Verbs are actions or states of being: run, is, becomes, thinks. Adjectives describe nouns (the RED car); adverbs describe verbs (ran QUICKLY).

Label the parts: "The nervous student answered quickly." → The (article) · nervous (adjective) · student (noun) · answered (verb) · quickly (adverb).

## Subjects: Find the Noun — Lesson 3A, Part 2 of 6

**More examples**

The subject is the noun doing the verb. Strip away the extra words to find it:

- "The box of old photos is heavy." → subject = box (not photos). is ✓
- "My friends from the team are here." → subject = friends. are ✓
- "Each of the students has a locker." → subject = Each (singular). has ✓
