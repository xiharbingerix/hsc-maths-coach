import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

type EditorialQuestion = {
  prompt: string;
  answer: string;
  explanation: string;
  acceptedAnswers?: string[];
  choices?: [string, string, string, string];
};

const q = (
  prompt: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): EditorialQuestion => ({ prompt, answer, explanation, acceptedAnswers });

const mcq = (
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string
): EditorialQuestion => ({ prompt, answer, choices, explanation });

const ALGEBRA_D5: Record<string, [EditorialQuestion, EditorialQuestion, EditorialQuestion]> = {
  "algebraic-relationships-revision": [
    q(
      "A delivery service charges a fixed fee plus a constant rate per kilometre. A 12 km trip costs $41 and a 20 km trip costs $61. Find the fixed fee.",
      "11",
      "The rate is (61 - 41)/(20 - 12) = $2.50 per kilometre. Substituting into 41 = 12(2.50) + b gives b = 11.",
      ["$11", "11 dollars"]
    ),
    mcq(
      "A student claims the table x: 0, 1, 2, 3 and y: 4, 7, 11, 14 is linear because the overall increase is 10. Which diagnosis is correct?",
      "C",
      [
        "It is linear because 10 is constant",
        "It is linear because all y-values increase",
        "It is not linear because the first differences 3, 4, 3 are not constant",
        "It is not linear because x starts at zero",
      ],
      "A linear table needs every first difference to be equal. Here the changes are 3, 4 and 3, so the relationship is not linear."
    ),
    q(
      "Two linear rules agree when x = 6. Rule A has gradient 5 and value 18 when x = 2. Rule B has gradient 2. Find the y-intercept of Rule B.",
      "24",
      "Rule A is y = 5x + 8 because 18 = 5(2) + 8. At x = 6 its value is 38. For Rule B, 38 = 2(6) + b, so b = 24.",
      ["b=24", "b = 24"]
    ),
  ],
  "linear-relationships-modelling": [
    q(
      "Plan A costs $18 plus $4 per GB. Plan B costs $42 plus $2 per GB. Find the smallest whole number of GB for which Plan B is cheaper.",
      "13",
      "Solve 42 + 2g < 18 + 4g. This gives 24 < 2g, so g > 12. The smallest whole-number usage is 13 GB.",
      ["13 GB", "13GB"]
    ),
    q(
      "A tank contains 860 L and drains at a constant rate. After 18 minutes it contains 590 L. Find the time in minutes when the tank first reaches 200 L.",
      "44",
      "The tank loses (860 - 590)/18 = 15 L per minute, so V = 860 - 15t. Solving 200 = 860 - 15t gives t = 44 minutes.",
      ["44 minutes", "44 min"]
    ),
    q(
      "A taxi model C = 7 + 2.4d is valid only for trips up to 50 km. A customer has $100. Find the greatest whole-number distance the model allows them to travel.",
      "38",
      "The budget gives 7 + 2.4d <= 100, so d <= 38.75. Distance must be a whole number and below the 50 km model limit, so the maximum is 38 km.",
      ["38 km", "38km"]
    ),
  ],
  "quadratic-models": [
    q(
      "A rectangular enclosure beside a wall uses 40 m of fencing for three sides. If the width perpendicular to the wall is x, find the integer width that maximises area.",
      "10",
      "The length is 40 - 2x, so A = x(40 - 2x) = -2x² + 40x. The vertex occurs at x = -40/-4 = 10 m.",
      ["10 m", "10 metres"]
    ),
    mcq(
      "A profit model has roots 4 and 18 and opens downwards. A student says profit is positive for x < 4 and x > 18. Which correction is valid?",
      "B",
      [
        "Profit is positive only at x = 4 and x = 18",
        "Profit is positive between the roots, for 4 < x < 18",
        "Profit is positive for every x because the graph opens downwards",
        "The roots cannot be interpreted without the vertex",
      ],
      "A downward-opening parabola lies above the x-axis between its two roots. Therefore positive profit occurs for 4 < x < 18."
    ),
    q(
      "A ball follows h = -5t² + 30t + 2. A 40 m roof is nearby. Find the maximum height and hence state whether the ball clears the roof. Enter the maximum height.",
      "47",
      "The vertex time is t = -30/(2 x -5) = 3 seconds. Substitution gives h(3) = -45 + 90 + 2 = 47 m, so the ball clears the 40 m roof.",
      ["47 m", "47 metres"]
    ),
  ],
  "exponential-inverse-variation": [
    q(
      "A medicine dose is 640 mg and 20% is removed each hour. Find the first whole hour when less than 250 mg remains.",
      "5",
      "The model is M = 640 times 0.8 to the power t. After 4 hours about 262.1 mg remains, while after 5 hours about 209.7 mg remains, so the first whole hour is 5.",
      ["5 hours", "5 h"]
    ),
    q(
      "Six identical pumps empty a reservoir in 14 hours. Assuming inverse variation, two pumps fail after half the job is completed. Find the total completion time.",
      "17.5",
      "The first half takes 7 hours with six pumps. The remaining half represents 42 pump-hours, so four pumps need 42/4 = 10.5 hours. Total time is 17.5 hours.",
      ["17.5 hours", "17 h 30 min"]
    ),
    q(
      "A population doubles every 3 years. It is 12,000 now. A facility can support 70,000 people. Find the first whole year in which the model exceeds capacity.",
      "8",
      "The model is P = 12000 times 2 to the power t/3. At 7 years it is about 60,476, while at 8 years it is about 76,195. Capacity is first exceeded in year 8.",
      ["8 years", "year 8"]
    ),
  ],
  "reciprocal-relationships": [
    q(
      "A journey takes 6 hours at 80 km/h. Assuming time varies inversely with speed, find the minimum whole-number speed needed to complete it in under 4.5 hours.",
      "107",
      "Distance is constant at 80 x 6 = 480 km. The condition 480/v < 4.5 gives v > 106.67, so the minimum whole-number speed is 107 km/h.",
      ["107 km/h", "107"]
    ),
    mcq(
      "For y = 24/x, a student predicts y = 0 when x = 1000 because the graph is close to the axis. Which statement is correct?",
      "D",
      [
        "The prediction is exact because 1000 is large",
        "The prediction is exact because y has an x-axis intercept",
        "The model is undefined for x = 1000",
        "The value is 0.024; the graph approaches but never reaches y = 0",
      ],
      "Substitution gives y = 24/1000 = 0.024. The x-axis is an asymptote, so finite non-zero x-values do not produce y = 0."
    ),
    q(
      "A rectangular hyperbola y = k/x passes through (8, 15). Find the positive x-value where y is 40% of 15.",
      "20",
      "First k = 8 x 15 = 120. Forty percent of 15 is 6, so 6 = 120/x and x = 20.",
      ["x=20", "x = 20"]
    ),
  ],
  "simultaneous-equations-context": [
    q(
      "Venue A charges $500 plus $18 per guest. Venue B charges $260 plus $24 per guest. Find the smallest whole number of guests for which Venue A is cheaper.",
      "41",
      "Solve 500 + 18g < 260 + 24g. This gives 240 < 6g, so g > 40. The smallest whole number is 41 guests.",
      ["41 guests", "41"]
    ),
    q(
      "A school sold 240 tickets. Adult tickets cost $18 and student tickets cost $11, producing $3270. Find the number of adult tickets.",
      "90",
      "Let a + s = 240 and 18a + 11s = 3270. Substituting s = 240 - a gives 7a = 630, so a = 90.",
      ["90 adult tickets", "90 adults"]
    ),
    q(
      "Plans P = 30 + 8x and Q = 54 + 5x intersect at x = 8. A $15 fee is added to Plan Q only. Find the new intersection value of x.",
      "13",
      "The changed model is Q = 69 + 5x. Solve 30 + 8x = 69 + 5x, giving 3x = 39 and x = 13.",
      ["x=13", "x = 13"]
    ),
  ],
  "linear-inequalities-modelling": [
    q(
      "A fundraiser has fixed costs of $420 and earns $18 per ticket. At least $750 profit is required. Find the minimum number of tickets.",
      "65",
      "Profit is 18n - 420. Solve 18n - 420 >= 750 to get 18n >= 1170, so n >= 65 tickets.",
      ["65 tickets", "65"]
    ),
    mcq(
      "A student solves -3x + 7 <= 19 and obtains x <= -4. Which correction identifies the error?",
      "A",
      [
        "Dividing by -3 must reverse the inequality, giving x >= -4",
        "Subtracting 7 must reverse the inequality, giving x >= 4",
        "The inequality should become x <= 4",
        "There is no error",
      ],
      "After subtracting 7, -3x <= 12. Dividing by the negative number -3 reverses the sign, giving x >= -4."
    ),
    q(
      "A lift holds at most 900 kg. The operator weighs 75 kg and each crate weighs 48 kg. Find the maximum whole number of crates.",
      "17",
      "Solve 75 + 48c <= 900. Then 48c <= 825 and c <= 17.1875, so at most 17 whole crates are allowed.",
      ["17 crates", "17"]
    ),
  ],
  "working-with-formulae-substitution": [
    q(
      "The stopping-distance model is d = 0.006v² + 0.7v, where v is in km/h. A road provides 90 m of clear distance. Find the greatest whole-number speed for which the model gives d <= 90.",
      "77",
      "Testing the boundary gives d(75) = 86.25 m and d(76) = 87.86 m, while d(78) = 91.10 m. Solving the quadratic boundary gives about 77.3, so the greatest whole speed is 77.",
      ["77 km/h", "77"]
    ),
    q(
      "BMI is m/h². Two people have the same BMI. Person A has mass 72 kg and height 1.8 m. Person B is 1.5 m tall. Find Person B's mass.",
      "50",
      "Person A's BMI is 72/1.8² = 22.222.... Using m = BMI x h² for Person B gives m = 22.222... x 1.5² = 50 kg.",
      ["50 kg", "50 kilograms"]
    ),
    mcq(
      "A student uses the compound-interest formula with r = 5 instead of 0.05. Which diagnosis best explains the resulting error?",
      "B",
      [
        "The number of periods is too small",
        "The percentage rate was not converted to a decimal, making the growth factor 6 instead of 1.05",
        "Compound interest should use subtraction",
        "The principal should be divided by the rate",
      ],
      "A percentage must be divided by 100 before substitution. Five percent is 0.05, so the correct growth factor is 1.05, not 6."
    ),
  ],
  "algebraic-relationships-exam-practice": [
    q(
      "A hire company charges $36 plus $14 per hour. A competitor charges $84 plus $8 per hour. Find the duration at which the costs are equal and the common cost. Enter the common cost.",
      "148",
      "Solve 36 + 14h = 84 + 8h to get h = 8. Substitution gives 36 + 14(8) = $148.",
      ["$148", "148 dollars"]
    ),
    q(
      "A value follows V = 960 times 0.75 to the power n. A replacement is required once V falls below 250. Find the first whole value of n requiring replacement.",
      "5",
      "V(4) = 303.75, which is above 250. V(5) = 227.8125, which is below 250, so replacement is first required at n = 5.",
      ["n=5", "n = 5"]
    ),
    mcq(
      "A quadratic model has roots -2 and 7, but the context restricts x to non-negative values. Which conclusion is valid?",
      "C",
      [
        "Both roots must be rejected because one is negative",
        "Both roots must be retained because algebra overrides context",
        "Only x = 7 is a valid contextual solution",
        "Only x = -2 is a valid contextual solution",
      ],
      "Both roots solve the equation algebraically, but the restriction x >= 0 excludes -2. The valid contextual solution is x = 7."
    ),
  ],
};

const TRIG_D5: Record<string, [EditorialQuestion, EditorialQuestion, EditorialQuestion]> = {
  "trigonometry-revision": [
    mcq(
      "A 13 m support cable reaches the top of a 12 m pole. A student adds the squares of 13 and 12 to find the ground distance. Which correction is valid?",
      "B",
      ["Add the squares because the cable is adjacent", "Use sqrt(13² - 12²) because the cable is the hypotenuse", "Use 13 - 12 because all sides are lengths", "Use tan inverse of 13/12"],
      "The cable is the hypotenuse, so the ground distance is sqrt(13² - 12²) = sqrt(25) = 5 m."
    ),
    q(
      "A wheelchair ramp rises 0.9 m over a horizontal distance of 7.2 m. Regulations require the incline angle to be no more than 7 degrees. Find the incline angle to 1 decimal place.",
      "7.1°",
      "Use tan(theta) = 0.9/7.2. Therefore theta = tan inverse(0.125) = 7.125 degrees, which rounds to 7.1 degrees and is slightly above the limit.",
      ["7.1", "7.1 degrees"]
    ),
    q(
      "An observer's eye is 1.6 m above the ground. From 18 m away, the angle of elevation to the top of a tower is 35 degrees. Find the tower height to 1 decimal place.",
      "14.2 m",
      "The height above eye level is 18 tan(35 degrees) = 12.60 m. Adding the 1.6 m eye height gives 14.20 m, or 14.2 m.",
      ["14.2", "14.2 metres"]
    ),
  ],
  "right-angled-trig-radians": [
    q(
      "A right triangle has an angle of 0.8 radians and adjacent side 12 m. Find the opposite side to 2 decimal places.",
      "12.36 m",
      "In radian mode, tan(0.8) = opposite/12. Thus opposite = 12 tan(0.8) = 12.355..., which rounds to 12.36 m.",
      ["12.36", "12.36m"]
    ),
    q(
      "A right triangle has angle 72 degrees and opposite side 9 m. Convert the angle to radians, then find the hypotenuse to 2 decimal places.",
      "9.46 m",
      "The angle is 72pi/180 = 0.4pi radians. Then sin(0.4pi) = 9/h, so h = 9/sin(0.4pi) = 9.46 m.",
      ["9.46", "9.46m"]
    ),
    q(
      "An access ramp must rise 1.2 m and have an incline no greater than 0.14 radians. Find the minimum ramp length to 2 decimal places.",
      "8.60 m",
      "At the limiting angle, sin(0.14) = 1.2/L. Hence L = 1.2/sin(0.14) = 8.60 m; a shorter ramp would be too steep.",
      ["8.60", "8.6 m", "8.6"]
    ),
  ],
  "elevation-depression-applications": [
    q(
      "Two points on level ground are 20 m apart on the same side of a tower. Their angles of elevation are 50 degrees at the nearer point and 30 degrees at the farther point. Find the tower height to 1 decimal place.",
      "22.4 m",
      "Let x be the nearer horizontal distance. Then x tan50 = (x + 20) tan30. Solving gives x about 18.79 m and height x tan50 about 22.4 m.",
      ["22.4", "22.4 metres"]
    ),
    q(
      "From the top of a cliff, the angle of depression to a boat 150 m horizontally from the cliff base is 25 degrees. Find the cliff height to 1 decimal place.",
      "69.9 m",
      "The angle of elevation from the boat is also 25 degrees. With opposite height h and adjacent distance 150, h = 150 tan25 = 69.95 m, which rounds to 69.9 m.",
      ["69.9", "69.9 metres", "70.0 m"]
    ),
    q(
      "A surveyor 1.7 m tall stands 32 m from a building. The angle of elevation from eye level is 41 degrees. A 2 m antenna sits on the roof. Find the building height excluding the antenna to 1 decimal place.",
      "27.5 m",
      "The vertical rise to the antenna tip is 32 tan41 = 27.82 m. Add eye height and subtract the 2 m antenna: 27.82 + 1.7 - 2 = 27.52 m.",
      ["27.5 m", "27.5", "27.52 m"]
    ),
  ],
  "sine-rule-cosine-rule-area-triangle": [
    q(
      "Two walking tracks leave a campsite with lengths 14 km and 9 km and an included angle of 110 degrees. Find the distance between their endpoints to 2 decimal places.",
      "19.06 km",
      "Use the cosine rule: d² = 14² + 9² - 2(14)(9)cos110. This gives d² about 363.19, so d = 19.06 km.",
      ["19.06", "19.06km"]
    ),
    mcq(
      "A student uses one half ab sin C with sides 8 and 13, but uses an angle that is not between those sides. Which diagnosis is correct?",
      "C",
      ["The formula works with any angle", "The side lengths must first be squared", "The formula requires the included angle between the two chosen sides", "Sine must be replaced by cosine"],
      "In area = one half ab sin C, C must be the included angle between sides a and b. A non-included angle pairs the wrong measurements."
    ),
    q(
      "A triangular garden has one side 18 m and an included angle of 42 degrees. Its area must not exceed 100 square metres. Find the greatest possible length of the other side to 1 decimal place.",
      "16.6 m",
      "Use 0.5(18)x sin42 <= 100. Solving gives x <= 200/(18 sin42) = 16.60..., so the greatest allowed length is 16.6 m.",
      ["16.6", "16.6 metres"]
    ),
  ],
  "non-right-angled-trigonometry": [
    mcq(
      "A triangle has sides 11 m and 15 m with included angle 70 degrees. Which calculation correctly finds the third side c?",
      "D",
      ["c = 11 sin70/15", "c² = 11² + 15² + 2(11)(15)cos70", "c = 0.5(11)(15)sin70", "c² = 11² + 15² - 2(11)(15)cos70"],
      "Two sides and their included angle require the cosine rule with the subtraction term. This gives c about 15.27 m."
    ),
    q(
      "A triangular reserve has sides 25 m and 32 m with included angle 58 degrees. Find its area to the nearest square metre.",
      "339 m²",
      "Area = 0.5(25)(32)sin58 = 339.22 square metres, which rounds to 339 square metres.",
      ["339", "339 square metres", "339 m²"]
    ),
    mcq(
      "A triangle has angles 35 degrees, 65 degrees and 80 degrees. A student pairs the 35-degree angle with the side opposite 65 degrees in the sine rule. What is the consequence?",
      "A",
      ["The proportion is invalid because each side must pair with its opposite angle", "The answer is unaffected because all angles are in one triangle", "The cosine rule automatically corrects the pairing", "The side must instead pair with the included angle"],
      "The sine rule depends on matched opposite pairs. Pairing a side with a non-opposite angle creates an invalid proportion."
    ),
  ],
  "ambiguous-case-sine-rule": [
    q(
      "In triangle ABC, A = 35 degrees, a = 8 cm and b = 11 cm. Find the number of possible triangles.",
      "2",
      "The sine rule gives sin B = 11sin35/8 about 0.789. Both B about 52.1 degrees and B about 127.9 degrees leave a positive third angle, so two triangles are possible.",
      ["two", "2 triangles"]
    ),
    q(
      "In triangle ABC, A = 42 degrees, a = 10 cm and b = 14 cm. Find the larger possible value of angle B to 1 decimal place.",
      "110.5°",
      "The sine rule gives sin B = 14sin42/10 about 0.937. The acute solution is about 69.5 degrees, so the supplementary solution is 180 - 69.5 = 110.5 degrees.",
      ["110.5", "110.5 degrees"]
    ),
    q(
      "For an SSA case, A = 30 degrees, a = 6 cm and b = 15 cm. Determine the number of possible triangles.",
      "0",
      "The perpendicular height is b sin A = 15 sin30 = 7.5 cm. Since a = 6 cm is shorter than this height, it cannot reach the base, so no triangle exists.",
      ["none", "no triangle", "0 triangles"]
    ),
  ],
};

const RATES_D5: Record<string, EditorialQuestion[]> = {
  "ratios-rates-revision": [
    mcq(
      "A drink is mixed in the ratio syrup : water = 3 : 5. Which quantities make exactly 32 L at the same strength?",
      "B",
      ["9 L syrup and 23 L water", "12 L syrup and 20 L water", "15 L syrup and 17 L water", "18 L syrup and 14 L water"],
      "There are 8 ratio parts, so each part is 32 / 8 = 4 L. The required amounts are 3(4) = 12 L of syrup and 5(4) = 20 L of water."
    ),
    q(
      "A driver travels 180 km at 90 km/h and then 120 km at 60 km/h. Find the average speed for the whole journey.",
      "75 km/h",
      "The two stages each take 2 hours, so the total distance is 300 km and the total time is 4 hours. Average speed is 300 / 4 = 75 km/h.",
      ["75", "75km/h"]
    ),
    q(
      "An exchange gives 0.62 US dollars for 1 Australian dollar and then deducts a 3% service fee from the converted amount. How many US dollars are received for AUD 800?",
      "US$481.12",
      "Before the fee, AUD 800 converts to 800(0.62) = US$496. The customer receives 97% of this, so 496(0.97) = US$481.12.",
      ["481.12", "$481.12", "USD 481.12"]
    ),
  ],
  "ratios-rates-unit-conversions": [
    q(
      "A vehicle travels at 72 km/h. Convert this speed to metres per second.",
      "20 m/s",
      "Convert kilometres to metres and hours to seconds: 72(1000) / 3600 = 20. Therefore the speed is 20 m/s.",
      ["20", "20m/s"]
    ),
    q(
      "A pump delivers water at 2.4 L per minute for 35 minutes. Find the volume delivered in cubic metres.",
      "0.084 m3",
      "The pump delivers 2.4(35) = 84 L. Since 1000 L equals 1 cubic metre, 84 L equals 84 / 1000 = 0.084 cubic metres.",
      ["0.084", "0.084 cubic metres", "84 L"]
    ),
    mcq(
      "A student converts 3.2 square metres to 320 square centimetres by multiplying by 100. What is the correct diagnosis?",
      "D",
      ["The answer is correct because metres are converted to centimetres", "The student should divide by 100", "The student should multiply by 1000", "Area uses the squared scale factor, so the correct result is 32,000 square centimetres"],
      "Because 1 m = 100 cm, one square metre contains 100 by 100 = 10,000 square centimetres. Thus 3.2 square metres is 32,000 square centimetres."
    ),
  ],
  "energy-consumption-watts-kilowatts": [
    q(
      "A 2.4 kW heater operates for 45 minutes. Find the electrical energy used in kilowatt-hours.",
      "1.8 kWh",
      "Convert 45 minutes to 0.75 hours. Energy equals power multiplied by time, so 2.4(0.75) = 1.8 kWh.",
      ["1.8", "1.8kWh"]
    ),
    mcq(
      "Appliance A is rated at 1500 W and runs for 2 hours. Appliance B is rated at 900 W and runs for 3.5 hours. Which statement is correct?",
      "A",
      ["Appliance A uses 0.15 kWh less", "Appliance A uses 0.15 kWh more", "Both use 3.15 kWh", "Power alone shows that Appliance A uses less energy"],
      "Appliance A uses 1.5(2) = 3.00 kWh, while Appliance B uses 0.9(3.5) = 3.15 kWh. Appliance A therefore uses 0.15 kWh less."
    ),
    q(
      "An electricity plan charges 32 cents per kWh for the first 10 kWh each day and 38 cents per kWh after that. Find the charge for a day when 18.5 kWh is used.",
      "$6.43",
      "The first 10 kWh costs 10(0.32) = $3.20. The remaining 8.5 kWh costs 8.5(0.38) = $3.23, giving a total of $6.43.",
      ["6.43", "$6.43", "643 cents"]
    ),
  ],
  "scale-drawings-site-plans": [
    q(
      "On a plan drawn at scale 1 : 250, a fence measures 7.6 cm. Find its actual length in metres.",
      "19 m",
      "The actual length is 7.6(250) = 1900 cm. Dividing by 100 converts this to 19 m.",
      ["19", "19 metres", "1900 cm"]
    ),
    mcq(
      "A room has an area of 24 square centimetres on a 1 : 100 floor plan. What is its actual area?",
      "C",
      ["0.24 square metres", "2.4 square metres", "24 square metres", "2400 square metres"],
      "A length scale of 1 : 100 gives an area scale of 1 : 10,000. Thus 24 square centimetres represents 240,000 square centimetres, or 24 square metres."
    ),
    q(
      "A rectangular site is 24 m by 18 m. A building must be at least 3 m from every boundary. Find the greatest possible rectangular floor area if its sides remain parallel to the site boundaries.",
      "216 m2",
      "The setback removes 3 m from both ends of each dimension, leaving at most 18 m by 12 m. The greatest floor area is 18(12) = 216 square metres.",
      ["216", "216 square metres", "216 m2"]
    ),
  ],
  "rainfall-volume-calculations": [
    q(
      "A roof has a catchment area of 120 square metres. During 18 mm of rain, 85% of the water is collected. Find the volume collected in litres.",
      "1836 L",
      "Rainfall depth is 0.018 m, so the roof receives 120(0.018) = 2.16 cubic metres, or 2160 L. Collecting 85% gives 2160(0.85) = 1836 L.",
      ["1836", "1,836 L", "1.836 kL"]
    ),
    q(
      "A 5000 L tank initially contains 1200 L. Rain adds 3600 L, then 950 L is used. How much water remains if overflow is discarded?",
      "3850 L",
      "After the rain, the tank would contain 4800 L, which is below its 5000 L capacity. After 950 L is used, 4800 - 950 = 3850 L remains.",
      ["3850", "3,850 L", "3.85 kL"]
    ),
    q(
      "An empty 10,000 L tank collects 80% of the rain falling on a 250 square metre roof. Find the rainfall depth needed to fill the tank, in millimetres.",
      "50 mm",
      "The roof must receive 10,000 / 0.80 = 12,500 L, or 12.5 cubic metres. Depth is 12.5 / 250 = 0.05 m, which is 50 mm.",
      ["50", "50 millimetres", "0.05 m"]
    ),
  ],
  "bearings-navigation-problems": [
    q(
      "A boat travels 12 km on a bearing of 060 degrees, then 8 km due south. Find its distance from the starting point to 1 decimal place.",
      "10.6 km",
      "The first leg has east component 12 sin60 = 10.39 km and north component 12 cos60 = 6 km. After travelling south, the displacement is 10.39 km east and 2 km south, with length 10.6 km.",
      ["10.6", "10.6km", "10.58 km"]
    ),
    mcq(
      "A rescue base is on a bearing of 074 degrees from a vessel. A student says the vessel is on a bearing of 106 degrees from the base. Which correction is required?",
      "B",
      ["Use 074 degrees again", "Add 180 degrees, giving 254 degrees", "Subtract from 180 degrees, giving 106 degrees", "Subtract from 360 degrees, giving 286 degrees"],
      "A reverse or back bearing differs by 180 degrees. Since 074 + 180 = 254, the vessel is on a bearing of 254 degrees from the base."
    ),
    q(
      "Two hikers leave the same point. One walks 10 km on a bearing of 030 degrees and the other walks 14 km on a bearing of 120 degrees. Find the distance between them to 1 decimal place.",
      "17.2 km",
      "The angle between the two routes is 120 - 30 = 90 degrees. By Pythagoras, the separation is the square root of 10 squared plus 14 squared, which is 17.2 km.",
      ["17.2", "17.2km", "17.20 km"]
    ),
  ],
  "time-zones-conversions": [
    q(
      "Sydney is UTC+10 and Perth is UTC+8. What time is it in Perth when it is 6:35 pm in Sydney?",
      "4:35 pm",
      "Perth is two hours behind Sydney because its UTC offset is two hours smaller. Subtracting two hours from 6:35 pm gives 4:35 pm.",
      ["16:35", "4.35 pm", "4:35pm"]
    ),
    q(
      "A flight leaves Tokyo (UTC+9) at 10:40 pm and lasts 9 hours 25 minutes. Los Angeles is UTC-7. Find the local arrival time in Los Angeles.",
      "4:05 pm",
      "The departure is 1:40 pm UTC. Adding 9 hours 25 minutes gives 11:05 pm UTC, then subtracting 7 hours gives 4:05 pm in Los Angeles.",
      ["16:05", "4.05 pm", "4:05pm"]
    ),
    q(
      "Adelaide is UTC+10:30 and London is UTC+1. A video call starts at 9:15 am Monday in Adelaide. State the day and time in London.",
      "11:45 pm Sunday",
      "London is 9 hours 30 minutes behind Adelaide. Subtracting 9 hours 30 minutes from 9:15 am Monday gives 11:45 pm on Sunday.",
      ["Sunday 11:45 pm", "23:45 Sunday", "11.45 pm Sunday"]
    ),
  ],
  "practical-rates-ratios-exam-practice": [
    mcq(
      "Juice costs $3.60 for 750 mL or $5.50 for 1.25 L. Which option is better value, and by how much per litre?",
      "C",
      ["750 mL by $0.40 per litre", "750 mL by $0.50 per litre", "1.25 L by $0.40 per litre", "1.25 L by $0.50 per litre"],
      "The smaller bottle costs 3.60 / 0.75 = $4.80 per litre. The larger costs 5.50 / 1.25 = $4.40 per litre, so it is cheaper by $0.40 per litre."
    ),
    mcq(
      "A weather report records 25 mm of rain on an 80 square metre roof. Ignoring losses, how much water could be collected?",
      "D",
      ["200 L", "500 L", "1250 L", "2000 L"],
      "A depth of 25 mm is 0.025 m. Volume is 80(0.025) = 2 cubic metres, and each cubic metre is 1000 L, giving 2000 L."
    ),
    q(
      "A courier drives 60 km at 50 km/h, stops for 30 minutes, then drives 90 km at 75 km/h. Find the average speed from departure to arrival to 1 decimal place.",
      "51.7 km/h",
      "The driving times are 60 / 50 = 1.2 hours and 90 / 75 = 1.2 hours. Including the 0.5-hour stop gives 2.9 hours, so average speed is 150 / 2.9 = 51.7 km/h.",
      ["51.7", "51.7km/h", "51.72 km/h"]
    ),
  ],
};

const MEASUREMENT_D5: Record<string, EditorialQuestion[]> = {
  "surface-area-prisms-cylinders": [
    mcq(
      "A closed cylinder has radius 4 cm and height 10 cm. Which expression gives its total surface area?",
      "D",
      ["40 pi square centimetres", "80 pi square centimetres", "96 pi square centimetres", "112 pi square centimetres"],
      "A closed cylinder includes two circular ends and the curved surface. Its area is 2 pi(4 squared) + 2 pi(4)(10) = 32 pi + 80 pi = 112 pi square centimetres."
    ),
    q(
      "An open-top rectangular storage box is 1.2 m long, 0.8 m wide and 0.5 m high. Paint coverage must include 10% wastage. Find the area that should be allowed for, to 2 decimal places.",
      "3.26 m2",
      "The open box area is the base plus four sides: 1.2(0.8) + 2(1.2)(0.5) + 2(0.8)(0.5) = 2.96 square metres. Allowing 10% gives 2.96(1.10) = 3.256, or 3.26 square metres.",
      ["3.26", "3.26 square metres", "3.256 m2"]
    ),
    q(
      "A right triangular prism has a cross-section with side lengths 6 cm, 8 cm and 10 cm, and a prism length of 12 cm. Find its total surface area.",
      "336 cm2",
      "The two triangular ends have total area 2(0.5)(6)(8) = 48 square centimetres. The three rectangles have total area 12(6 + 8 + 10) = 288 square centimetres, so the total is 336 square centimetres.",
      ["336", "336 square centimetres", "336 cm2"]
    ),
  ],
  "volume-prisms-cylinders-spheres": [
    q(
      "A cylindrical tank has radius 1.5 m and height 4 m. It is filled to 80% of its capacity. Find the volume of water to 1 decimal place.",
      "22.6 m3",
      "The full volume is pi(1.5 squared)(4) = 9 pi cubic metres. At 80% capacity, the water volume is 0.8(9 pi) = 7.2 pi, which is 22.6 cubic metres to 1 decimal place.",
      ["22.6", "22.6 cubic metres", "7.2 pi m3"]
    ),
    q(
      "A spherical display has diameter 18 cm. Find its volume to the nearest cubic centimetre.",
      "3054 cm3",
      "The radius is 9 cm, not 18 cm. Using V = four thirds pi r cubed gives V = four thirds pi(9 cubed) = 972 pi, which rounds to 3054 cubic centimetres.",
      ["3054", "3,054 cm3", "972 pi cm3"]
    ),
    q(
      "A cylindrical rain tank has internal radius 1.2 m and height 2 m. Determine whether it can hold 8500 L, and state the spare capacity to the nearest litre.",
      "Yes, 548 L spare",
      "The tank volume is pi(1.2 squared)(2) = 2.88 pi cubic metres, or about 9047.8 L. This exceeds 8500 L by 547.8 L, so the tank can hold the water with 548 L spare.",
      ["548 L", "yes 548 L", "yes, 548 litres spare", "547.8 L spare"]
    ),
  ],
  "composite-solids-practical": [
    q(
      "A capsule-shaped vessel consists of a cylinder of radius 2 m and length 6 m with a hemisphere at each end. Find its internal volume to 1 decimal place.",
      "108.9 m3",
      "The two hemispheres form one sphere. The total volume is pi(2 squared)(6) + four thirds pi(2 cubed) = 24 pi + 32 pi / 3 = 108.9 cubic metres to 1 decimal place.",
      ["108.9", "108.9 cubic metres", "104 pi/3 m3"]
    ),
    q(
      "A swimming pool is 12 m long and 5 m wide. Its depth changes uniformly from 1.2 m to 2.0 m. Find the volume of water needed to fill it.",
      "96 m3",
      "A side view is a trapezium, so the average depth is (1.2 + 2.0) / 2 = 1.6 m. The volume is 12(5)(1.6) = 96 cubic metres.",
      ["96", "96 cubic metres", "96000 L"]
    ),
    q(
      "A hollow metal pipe is 120 cm long, with external radius 5 cm and internal radius 4 cm. Find the volume of metal to the nearest cubic centimetre.",
      "3393 cm3",
      "Subtract the inner cylinder from the outer cylinder: V = pi(5 squared - 4 squared)(120) = 1080 pi cubic centimetres. This rounds to 3393 cubic centimetres.",
      ["3393", "3,393 cm3", "1080 pi cm3"]
    ),
  ],
};

const INVESTMENT_D5: Record<string, EditorialQuestion[]> = {
  "investment-loans-revision": [
    q(
      "An investment of $8000 earns 5.2% interest compounded annually. Find its value after 3 years, to the nearest cent.",
      "$9314.02",
      "Use compound growth: A = 8000(1.052 cubed). This gives 9314.020864, so the investment is worth $9314.02 after 3 years.",
      ["9314.02", "$9,314.02", "$9314.02"]
    ),
    q(
      "A borrower receives $42,000 and repays $320 each week for 3 years, plus a $600 establishment fee. Find the total finance cost above the amount borrowed.",
      "$8520",
      "There are 3(52) = 156 weekly repayments, costing 156(320) = $49,920. Including the $600 fee gives $50,520, which is $8520 more than the $42,000 borrowed.",
      ["8520", "$8,520", "$8520"]
    ),
    mcq(
      "Two $10,000 investments run for 4 years at 6% per annum. Option S pays simple interest and Option C compounds annually. How much more does Option C return?",
      "B",
      ["$200.00", "$224.77", "$400.00", "$624.77"],
      "Simple interest gives $10,000(1 + 0.06(4)) = $12,400. Compound interest gives $10,000(1.06 to the power 4) = $12,624.77, a difference of $224.77."
    ),
  ],
  "investment-compound-interest": [
    mcq(
      "An account contains $12,500 and earns 4.8% per annum compounded quarterly for 2 years. Which value is closest to the final balance?",
      "C",
      ["$13,100", "$13,700", "$13,752", "$14,948"],
      "The quarterly rate is 0.048 / 4 = 0.012 and there are 8 quarters. Thus A = 12,500(1.012 to the power 8) = $13,751.63, closest to $13,752."
    ),
    mcq(
      "For 6% per annum compounded quarterly, a student uses a growth factor of 1.06 every quarter. What is the error?",
      "A",
      ["The annual rate must be divided by 4, giving a quarterly factor of 1.015", "The annual rate must be multiplied by 4", "Only the number of periods should be divided by 4", "Quarterly compounding uses simple interest"],
      "The quoted 6% is an annual nominal rate. Quarterly compounding uses 6% / 4 = 1.5% per quarter, so the growth factor is 1.015."
    ),
    q(
      "A $5000 investment earns 5% compounded annually. Find the minimum whole number of years needed for its value to reach at least $6000.",
      "4 years",
      "Solve 5000(1.05 to the power n) at least 6000. The exact crossing time is about 3.74 years, so 3 annual credits are insufficient and 4 whole years are required.",
      ["4", "four years", "4 years"]
    ),
  ],
  "shares-dividends-brokerage": [
    q(
      "An investor buys 800 shares at $6.40 each and pays brokerage of 1.5% of the purchase value. Find the total purchase cost.",
      "$5196.80",
      "The shares cost 800(6.40) = $5120. Brokerage is 0.015(5120) = $76.80, so the total purchase cost is $5196.80.",
      ["5196.80", "$5,196.80", "$5196.80"]
    ),
    q(
      "A shareholder owns 1200 shares. The company pays a dividend of 34 cents per share. Find the total dividend received.",
      "$408",
      "Convert 34 cents to $0.34, then multiply by the number of shares: 1200(0.34) = $408.",
      ["408", "$408.00", "$408"]
    ),
    q(
      "An investor buys 500 shares at $8.00 each with 1.5% brokerage, then sells them at $9.20 each with 1.5% brokerage. Find the net profit.",
      "$471",
      "The purchase costs $4000 + $60 = $4060. The sale returns $4600 - $69 = $4531 after brokerage, so the net profit is 4531 - 4060 = $471.",
      ["471", "$471.00", "$471"]
    ),
  ],
  "depreciation-loans": [
    q(
      "Equipment worth $48,000 depreciates by 18% each year using the declining-balance method. Find its value after 4 years, to the nearest dollar.",
      "$21,702",
      "The yearly retention factor is 1 - 0.18 = 0.82. After 4 years the value is 48,000(0.82 to the power 4) = $21,701.84, which rounds to $21,702.",
      ["21702", "$21702", "$21,702"]
    ),
    mcq(
      "A $30,000 car is depreciated for 3 years either by $4000 per year straight-line or by 15% per year declining balance. Which statement is correct?",
      "D",
      ["Straight-line is higher by $423.75", "Both values are $18,000", "Declining balance is lower by $423.75", "Declining balance is higher by $423.75"],
      "Straight-line gives $30,000 - 3($4000) = $18,000. Declining balance gives $30,000(0.85 cubed) = $18,423.75, which is $423.75 higher."
    ),
    q(
      "A loan balance follows B next = 1.01B current - 600, starting at $20,000. Find the balance immediately after the third monthly repayment.",
      "$18,787.96",
      "Apply the recurrence after each interest charge and repayment: B1 = 20,000(1.01) - 600 = 19,600; B2 = 19,196; and B3 = 19,196(1.01) - 600 = $18,787.96.",
      ["18787.96", "$18,787.96", "$18787.96"]
    ),
  ],
  "straight-line-vs-declining-depreciation": [
    q(
      "A machine costs $50,000 and has an estimated residual value of $10,000 after 8 years. Using straight-line depreciation, find its book value after 3 years.",
      "$35,000",
      "The depreciable amount is $50,000 - $10,000 = $40,000, so annual depreciation is $40,000 / 8 = $5000. After 3 years the value is $50,000 - 3($5000) = $35,000.",
      ["35000", "$35,000", "$35000"]
    ),
    q(
      "An asset initially worth $50,000 loses 20% of its value each year. Find its value after 5 years, to the nearest dollar.",
      "$16,384",
      "A 20% loss leaves 80% each year. The value is therefore $50,000(0.8 to the power 5) = $16,384.",
      ["16384", "$16,384", "$16384"]
    ),
    q(
      "A $60,000 asset is compared after 4 years. Model S uses straight-line depreciation to a $12,000 residual value over 6 years. Model D uses 25% declining-balance depreciation. State which model gives the lower value and the difference.",
      "Model D, by $9016",
      "Model S depreciates by ($60,000 - $12,000) / 6 = $8000 yearly, so its value is $28,000. Model D gives $60,000(0.75 to the power 4) = $18,984.38, which is about $9016 lower.",
      ["D by $9016", "declining balance by $9016", "Model D, $9,016 lower"]
    ),
  ],
};

const ANNUITIES_D5: Record<string, EditorialQuestion[]> = {
  "annuities-revision": [
    mcq(
      "Two accounts receive the same regular payment at the same interest rate. Account A receives each payment at the start of the period and Account B at the end. Which conclusion is correct?",
      "C",
      ["Both balances are always equal", "Account B is larger because its last payment is later", "Account A is larger because every payment earns interest for one extra period", "The result depends only on the payment amount"],
      "Account A is an annuity due. Each deposit earns one additional period of interest, so its future value is the ordinary-annuity value multiplied by one plus the periodic rate."
    ),
    q(
      "A saver deposits $200 at the end of each month into an account earning 0.5% per month. Find the balance immediately after the 24th deposit, to the nearest cent.",
      "$5086.39",
      "Use the ordinary-annuity formula with R = 200, i = 0.005 and n = 24. The value is 200((1.005 to the power 24 - 1) / 0.005) = $5086.39.",
      ["5086.39", "$5,086.39", "$5086.39"]
    ),
    mcq(
      "A retiree wants equal monthly withdrawals from a fixed starting balance until it is exhausted. Which model is appropriate?",
      "B",
      ["Future value of an ordinary annuity", "Present value of an annuity", "Simple interest only", "Declining-balance depreciation"],
      "The starting balance must equal the present value of all future withdrawals. A present-value annuity model discounts those payments back to retirement day."
    ),
  ],
  "annuities-regular-payments": [
    q(
      "A worker deposits $350 at the end of each month for 5 years. The account earns 0.4% per month. Find the final balance to the nearest cent.",
      "$23,681.06",
      "There are 60 monthly deposits. Using R = 350, i = 0.004 and n = 60 gives 350((1.004 to the power 60 - 1) / 0.004) = $23,681.06.",
      ["23681.06", "$23,681.06", "$23681.06"]
    ),
    q(
      "A business deposits $1000 at the end of each quarter into an account earning 2% per quarter. Find the balance after 8 deposits, to the nearest cent.",
      "$8582.97",
      "This is an ordinary annuity with R = 1000, i = 0.02 and n = 8. Its future value is 1000((1.02 to the power 8 - 1) / 0.02) = $8582.97.",
      ["8582.97", "$8,582.97", "$8582.97"]
    ),
    q(
      "A saver wants $50,000 after 5 years in an account earning 0.5% per month. Find the required end-of-month deposit to the nearest cent.",
      "$716.64",
      "For 60 deposits, the annuity factor is ((1.005 to the power 60 - 1) / 0.005). Dividing $50,000 by this factor gives a required monthly deposit of $716.64.",
      ["716.64", "$716.64", "$716.6401"]
    ),
  ],
  "present-value-annuities": [
    q(
      "A loan is repaid by 36 end-of-month payments of $900. Interest is 0.6% per month. Find the original loan amount to the nearest cent.",
      "$29,061.67",
      "The loan is the present value of the repayments: 900((1 - 1.006 to the power negative 36) / 0.006) = $29,061.67.",
      ["29061.67", "$29,061.67", "$29061.67"]
    ),
    mcq(
      "A lender calculates the present value of 48 monthly payments of $650 at 0.8% per month as $25,823.45. What does this amount represent?",
      "A",
      ["The maximum principal supported by those repayments", "The total cash repaid", "The interest charged over the loan", "The future value after 48 months"],
      "Discounting all repayments to the start gives the amount that can be borrowed now. It is the loan principal, not the undiscounted repayment total or interest alone."
    ),
    q(
      "A $25,000 loan is repaid monthly over 3 years at 0.7% interest per month. Find the required monthly repayment to the nearest cent.",
      "$788.03",
      "Set $25,000 equal to the present value of 36 repayments. Dividing by (1 - 1.007 to the power negative 36) / 0.007 gives a monthly repayment of $788.03.",
      ["788.03", "$788.03", "$788.0305"]
    ),
  ],
  "annuity-interest-factor-tables": [
    q(
      "A future-value annuity table gives a factor of 66.14 for the required rate and term. Find the accumulated value of regular payments of $450.",
      "$29,763",
      "A future-value factor multiplies the regular payment. Therefore the accumulated value is 450(66.14) = $29,763.",
      ["29763", "$29,763", "$29763"]
    ),
    mcq(
      "A student uses a future-value annuity factor to price a loan from its repayments. Which change is required?",
      "D",
      ["Multiply the rate by the term", "Use a simple-interest table", "Add one to the listed factor", "Use the present-value annuity factor for the matching rate and number of payments"],
      "A loan principal is the value now of future repayments, so the matching present-value factor is required. A future-value factor accumulates payments in the wrong time direction."
    ),
    q(
      "A present-value annuity table gives a factor of 42.58. Find the loan principal represented by payments of $700 per period.",
      "$29,806",
      "Multiply the regular repayment by the present-value factor: 700(42.58) = $29,806. This is the equivalent value of the repayment stream at the loan date.",
      ["29806", "$29,806", "$29806"]
    ),
  ],
  "retirement-annuity-planning": [
    q(
      "A worker wants to accumulate $300,000 by making end-of-month deposits for 20 years. The fund earns 0.5% per month. Find the required monthly deposit to the nearest cent.",
      "$649.29",
      "There are 240 deposits. Divide $300,000 by the future-value factor ((1.005 to the power 240 - 1) / 0.005), giving $649.29 per month.",
      ["649.29", "$649.29", "$649.2932"]
    ),
    mcq(
      "A retirement projection uses a fixed target of $500,000 twenty years from now but ignores inflation. What is the main limitation?",
      "B",
      ["Compound interest cannot be used over twenty years", "The target may buy substantially less in the future than $500,000 buys today", "Regular deposits cannot be modelled monthly", "Inflation always increases investment returns by the same rate"],
      "Inflation reduces purchasing power. A nominal target left unchanged for twenty years may not fund the intended lifestyle, even if the numerical balance is reached."
    ),
    q(
      "At retirement, $250,000 funds equal end-of-month withdrawals for 20 years while earning 0.5% per month. Find the monthly withdrawal to the nearest cent.",
      "$1791.08",
      "Treat the retirement balance as the present value of 240 withdrawals. Dividing $250,000 by (1 - 1.005 to the power negative 240) / 0.005 gives $1791.08 per month.",
      ["1791.08", "$1,791.08", "$1791.08"]
    ),
  ],
  "comparing-investments-risk-return": [
    q(
      "A $20,000 one-year investment can earn a guaranteed 4%, or return 8% with probability 0.7 and lose 5% with probability 0.3. Compare the guaranteed final value with the expected final value of the risky option.",
      "$20,800 guaranteed; $20,820 expected risky",
      "The guaranteed value is 20,000(1.04) = $20,800. The risky expected value is 0.7(21,600) + 0.3(19,000) = $20,820, only $20 higher and not guaranteed.",
      ["guaranteed $20800, risky $20820", "$20,800 and $20,820", "risky expected value is $20 higher"]
    ),
    q(
      "Explain why splitting savings between assets from different industries can reduce risk without guaranteeing a profit.",
      "Diversification reduces exposure to one asset or industry, but market losses can still affect the portfolio.",
      "Different assets do not always rise and fall together, so losses in one may be offset by another. However, diversification cannot remove broad market risk or guarantee a positive return.",
      ["diversification reduces concentration risk but cannot remove all risk", "it spreads risk but does not guarantee profit"]
    ),
    q(
      "An investment earns a nominal return of 6% while inflation is 2.5%. Find the real return using the exact multiplicative method, to 2 decimal places.",
      "3.41%",
      "The real growth factor is 1.06 / 1.025 = 1.034146. Subtracting 1 and converting to a percentage gives a real return of 3.41%.",
      ["3.41", "3.41 percent", "3.4146%"]
    ),
  ],
  "credit-cards-consumer-decisions": [
    q(
      "A credit-card balance is $2400. Monthly interest of 1.8% is added before a $150 repayment is made. Find the new balance.",
      "$2293.20",
      "Interest is 0.018(2400) = $43.20, so the balance becomes $2443.20 before payment. Subtracting $150 leaves $2293.20.",
      ["2293.20", "$2,293.20", "$2293.20"]
    ),
    mcq(
      "A cardholder pays only the minimum repayment while continuing to make purchases. Which consequence is most likely?",
      "C",
      ["Interest stops once a minimum payment is made", "The annual rate automatically falls", "The debt can persist because much of each payment covers interest and new spending", "The balance must halve each year"],
      "A minimum payment does not stop interest, and new purchases add to the balance. If little principal is removed, repayment time and total interest can grow substantially."
    ),
    q(
      "An item costs $1800 cash. A card plan requires 12 monthly payments of $165 and an annual fee of $120. Assuming no other charges, find how much more the plan costs than cash.",
      "$300",
      "The repayments total 12(165) = $1980. Adding the $120 fee gives $2100, which is $2100 - $1800 = $300 more than the cash price.",
      ["300", "$300.00", "$300"]
    ),
  ],
  "financial-decision-making-exam-practice": [
    mcq(
      "A client wants to determine how much must be invested now to fund fixed monthly withdrawals. Which quantity should be calculated?",
      "A",
      ["Present value of the withdrawal annuity", "Future value of the withdrawal annuity", "Simple interest on the total withdrawals", "Straight-line depreciation"],
      "The amount required now must equal the discounted value of all later withdrawals. That is the present value of an annuity."
    ),
    q(
      "Compare $500 deposited monthly for 10 years with $60,000 invested immediately, when both earn 0.5% per month. Find each final value to the nearest dollar.",
      "$81,940 for monthly deposits; $109,164 for the lump sum",
      "The annuity grows to 500((1.005 to the power 120 - 1) / 0.005) = $81,940. The immediate lump sum grows for all 120 months to 60,000(1.005 to the power 120) = $109,164.",
      ["$81940 and $109164", "monthly $81,940; lump sum $109,164", "lump sum is $27,224 higher"]
    ),
    q(
      "A borrower can afford $1200 monthly for 5 years at 0.5% interest per month. Find the maximum loan principal to the nearest dollar.",
      "$62,071",
      "The affordable principal is the present value of 60 repayments: 1200((1 - 1.005 to the power negative 60) / 0.005) = $62,070.67, which rounds to $62,071.",
      ["62071", "$62,071", "$62071"]
    ),
  ],
};

const BIVARIATE_D5: Record<string, EditorialQuestion[]> = {
  "bivariate-data-revision": [
    mcq(
      "A study finds a correlation coefficient of -0.86 between weekly exercise time and resting heart rate. Which conclusion is justified?",
      "B",
      ["Exercise definitely causes lower heart rate", "There is a strong negative linear association, but correlation alone does not establish causation", "There is a weak positive association", "Exactly 86% of participants have a lower heart rate"],
      "A coefficient near -1 indicates a strong negative linear association. An observational correlation does not by itself rule out confounding variables or establish a causal mechanism."
    ),
    q(
      "A fitted model for delivery cost is C = 12 + 3.5d, where d is distance in kilometres. Predict the cost for 8 km and interpret the gradient.",
      "$40; cost increases by $3.50 per kilometre",
      "Substitute d = 8 to obtain C = 12 + 3.5(8) = $40. The gradient 3.5 means the model adds $3.50 for each additional kilometre travelled.",
      ["$40 and $3.50 per km", "40; 3.5 dollars per kilometre", "$40, increasing $3.50/km"]
    ),
    q(
      "A regression model predicts a value of 40, but the observed value is 46. Find and interpret the residual.",
      "6; the model underestimates by 6",
      "Residual equals observed minus predicted, so 46 - 40 = 6. The positive residual means the actual value lies 6 units above the model prediction.",
      ["6", "+6", "positive 6, so the prediction is 6 too low"]
    ),
  ],
  "bivariate-data-scatterplots": [
    q(
      "The points (1, 2), (2, 4), (3, 6), (4, 8) and (5, 20) are plotted. Identify the unusual point and explain its likely effect on a fitted line.",
      "(5, 20); it pulls the fitted line upward and makes its slope steeper",
      "The first four points follow y = 2x, while (5, 20) lies far above that pattern. Because it also has the largest x-value, it has high leverage and pulls the fitted line upward at the right."
      , ["(5,20), it increases the slope", "the point (5, 20) pulls the line upward", "(5, 20); steeper fitted line"]
    ),
    q(
      "A scatterplot shows values falling as x increases from 1 to 5, then rising as x increases from 5 to 9. Explain why a correlation coefficient near zero could be misleading.",
      "The data have a curved relationship even though there may be little linear correlation.",
      "The downward and upward linear tendencies can cancel when one correlation coefficient is calculated. A value near zero describes weak linear association, not necessarily no relationship."
      , ["there is a nonlinear relationship", "a curved association can have correlation near zero", "zero correlation does not mean no relationship"]
    ),
    q(
      "Two scatterplots have the same positive correlation. Plot A is tightly clustered except for one influential point, while Plot B is moderately clustered throughout. Explain why the coefficient alone is insufficient for choosing a model.",
      "The plots can have different outliers and shapes despite the same correlation, so both the graph and context must be checked.",
      "Correlation compresses the data into one measure of linear association. It does not reveal influential points, curvature, clusters or whether a linear model is sensible in context."
      , ["correlation does not show outliers or shape", "inspect the scatterplots because r hides influential points", "the same r can hide different patterns"]
    ),
  ],
  "correlation-association": [
    q(
      "A sample has correlation r = 0.92 between advertising expenditure and sales. State a valid interpretation and one conclusion that cannot be made from this result alone.",
      "There is a strong positive linear association; advertising cannot be claimed to cause higher sales from correlation alone.",
      "The value 0.92 is close to 1, supporting a strong positive linear association in the sample. Causation requires stronger evidence because other variables may influence both quantities."
      , ["strong positive association but not causation", "strong positive linear correlation; no causal conclusion", "sales and advertising are strongly associated, not proven causal"]
    ),
    q(
      "Ice-cream sales and swimming rescues are positively associated across the year. Identify a plausible confounding variable and explain its role.",
      "Temperature; hot weather can increase both ice-cream sales and the number of people swimming.",
      "Temperature provides a common explanation for both variables. Warmer days increase demand for ice cream and expose more swimmers to risk, so sales need not cause rescues."
      , ["hot weather affects both", "temperature increases both variables", "season or temperature is a confounder"]
    ),
    q(
      "Dataset A has r = -0.75 and Dataset B has r = -0.40. Compare the direction and strength of their linear associations.",
      "Both are negative, but Dataset A has the stronger linear association.",
      "Both coefficients are below zero, so both associations are negative. Since the magnitude 0.75 is closer to 1 than 0.40, Dataset A has the stronger linear association."
      , ["both negative; A is stronger", "Dataset A is a stronger negative association", "A has greater strength and both have negative direction"]
    ),
  ],
  "regression-prediction-residuals": [
    q(
      "A regression model is y = 18 + 2.4x. Predict y when x = 15 and explain what the prediction represents.",
      "54; it is the model's estimated response when x is 15",
      "Substitution gives y = 18 + 2.4(15) = 54. This is a model-based estimate of the typical response at x = 15, not a guarantee for every observation."
      , ["54", "y = 54", "54, the predicted response at x = 15"]
    ),
    q(
      "For x = 15, a model predicts 54 but the observed response is 49. Calculate the residual and interpret its sign.",
      "-5; the model overestimates the observed value by 5",
      "Residual equals observed minus predicted, so 49 - 54 = -5. The negative sign shows the observed point is below the fitted line and the prediction is 5 too high."
      , ["-5", "negative 5; prediction is too high", "-5, observed is 5 below predicted"]
    ),
    q(
      "A regression model was fitted using x-values from 5 to 25. A report uses it to predict at x = 60. Evaluate this use of the model.",
      "The prediction is an unreliable extrapolation because 60 is far outside the observed range.",
      "The fitted relationship is supported only over x-values from 5 to 25. At x = 60 the trend may change, so extending the line that far is unsupported extrapolation."
      , ["unreliable extrapolation", "60 is outside the data range", "the model should not be extrapolated to x = 60"]
    ),
  ],
};

const PROBABILITY_D5: Record<string, EditorialQuestion[]> = {
  "probability-revision": [
    q(
      "A bag contains 5 red and 3 blue counters. Two counters are selected without replacement. Find the probability that both are red.",
      "5/14",
      "The probability changes after the first counter is removed. Multiply 5/8 by 4/7 to obtain 20/56, which simplifies to 5/14.",
      ["5/14", "0.357142857", "35.714%"]
    ),
    q(
      "Of 50 bus commuters, 30 were late. Of 70 car commuters, 14 were late. Find the probability that a randomly selected late commuter travelled by bus.",
      "15/22",
      "There are 30 + 14 = 44 late commuters, and 30 of them travelled by bus. The required conditional probability is 30/44 = 15/22.",
      ["15/22", "30/44", "0.6818"]
    ),
    q(
      "A fair die is rolled three times. Find the probability of obtaining at least one six.",
      "91/216",
      "Use the complement. The probability of no six in three rolls is (5/6)(5/6)(5/6) = 125/216, so at least one six has probability 1 - 125/216 = 91/216.",
      ["91/216", "0.421296", "42.13%"]
    ),
  ],
  "relative-frequency-probability": [
    mcq(
      "An event occurs 42 times in 60 trials. Using this relative frequency, how many occurrences are expected in the next 250 similar trials?",
      "C",
      ["105", "168", "175", "208"],
      "The estimated probability is 42/60 = 0.7. Multiplying by 250 gives an expected frequency of 0.7(250) = 175."
    ),
    q(
      "A game has theoretical win probability 0.60. A player wins 54 of 100 trials. Compare the result with the model and explain whether it proves the game is unfair.",
      "The observed probability is 0.54, which is 0.06 lower; this difference alone does not prove unfairness.",
      "The relative frequency is 54/100 = 0.54. Random variation can produce a difference of 0.06 in a finite sample, so more evidence is needed before rejecting the model.",
      ["0.54, 0.06 below, not proof of unfairness", "the result is 6 percentage points lower but could be random", "54% does not by itself disprove 60%"]
    ),
    q(
      "Explain why a relative-frequency estimate based on 5000 trials is generally more reliable than one based on 20 trials.",
      "A larger sample reduces the effect of random variation, so relative frequency tends to be closer to the long-run probability.",
      "Individual outcomes have less influence on a large sample proportion. Over many repeated trials, relative frequency tends to stabilise near the underlying probability."
      , ["larger samples have less random variation", "5000 trials gives a more stable estimate", "relative frequency tends to stabilise with more trials"]
    ),
  ],
  "multistage-events-independence": [
    q(
      "A fair coin is tossed three times. Find the probability of obtaining exactly one head.",
      "3/8",
      "Exactly one head can occur as HTT, THT or TTH. Each sequence has probability 1/8, so the total probability is 3/8.",
      ["3/8", "0.375", "37.5%"]
    ),
    q(
      "Events A and B have P(A) = 0.4, P(B) = 0.5 and P(A and B) = 0.18. Determine whether they are independent.",
      "Not independent",
      "If the events were independent, P(A and B) would equal 0.4(0.5) = 0.20. Since the given intersection is 0.18, the independence condition fails.",
      ["no", "not independent because 0.18 is not 0.20", "dependent"]
    ),
    q(
      "A batch contains 4 defective and 16 acceptable items. Two are selected without replacement. Find the probability of selecting at least one defective item.",
      "7/19",
      "The complement is selecting two acceptable items: (16/20)(15/19) = 12/19. Therefore at least one defective item has probability 1 - 12/19 = 7/19.",
      ["7/19", "0.368421", "36.84%"]
    ),
  ],
  "expected-frequency-contingency-tables": [
    q(
      "A survey model predicts that 35% of 200 respondents will answer yes. Find the expected frequency of yes responses.",
      "70",
      "Expected frequency equals probability multiplied by the number of trials. Therefore 0.35(200) = 70 respondents are expected to answer yes.",
      ["70", "70 respondents", "seventy"]
    ),
    q(
      "A table records 36 yes and 24 no responses from males, and 24 yes and 16 no responses from females. Find P(yes given female) and compare it with P(yes given male).",
      "Both are 0.6",
      "For females, P(yes given female) = 24/(24 + 16) = 0.6. For males it is 36/(36 + 24) = 0.6, so the conditional proportions are equal.",
      ["0.6 and 0.6", "both 60%", "both equal 3/5"]
    ),
    q(
      "In a sample of 200 people, a row total is 80 and a column total is 50. If the row and column categories are independent, find the expected frequency in their intersecting cell.",
      "20",
      "Under independence, expected frequency is (row total multiplied by column total) divided by the grand total. Thus 80(50)/200 = 20.",
      ["20", "20 people", "twenty"]
    ),
  ],
};

const NORMAL_D5: Record<string, EditorialQuestion[]> = {
  "normal-distribution-revision": [
    q(
      "Test scores are approximately normal with mean 70 and standard deviation 8. Find the z-score for 86 and estimate the percentage of scores above 86 using the empirical rule.",
      "z = 2; about 2.5%",
      "Standardising gives z = (86 - 70) / 8 = 2. About 95% lie within two standard deviations, leaving 5% outside and approximately 2.5% in the upper tail.",
      ["2 and 2.5%", "z=2, 2.5 percent above", "about 2.5%"]
    ),
    q(
      "A normal distribution has mean 70 and standard deviation 8. Estimate the percentage of observations between 62 and 78.",
      "About 68%",
      "The endpoints are one standard deviation below and above the mean. By the empirical rule, approximately 68% of observations lie within this interval.",
      ["68%", "approximately 68 percent", "about 68"]
    ),
    q(
      "A dataset is strongly right-skewed with several extreme high values. Explain why applying the normal empirical rule may be misleading.",
      "The distribution is not approximately symmetric and bell-shaped, so normal-rule percentages may not describe it.",
      "The empirical rule assumes an approximately normal shape. Strong skew and extreme values make the two sides behave differently, so normal tail and interval estimates can be inaccurate.",
      ["the data are not approximately normal", "skew violates the normal-model assumption", "the empirical rule is unsuitable for a skewed distribution"]
    ),
  ],
  "normal-distribution-z-scores": [
    q(
      "Student A scores 78 in a test with mean 70 and standard deviation 4. Student B scores 90 in a test with mean 75 and standard deviation 10. Who performed better relative to their group?",
      "Student A",
      "Student A has z = (78 - 70) / 4 = 2, while Student B has z = (90 - 75) / 10 = 1.5. Student A is further above their group mean in standard-deviation units.",
      ["A", "Student A because z=2", "student A performed relatively better"]
    ),
    q(
      "A distribution has mean 50 and standard deviation 6. Find the raw score corresponding to z = -1.25.",
      "42.5",
      "Rearrange z = (x - mean) / standard deviation to x = mean + z(standard deviation). Thus x = 50 + (-1.25)(6) = 42.5.",
      ["42.5", "x = 42.5", "42.50"]
    ),
    q(
      "An observation has z = 2.4. Interpret this value and comment on whether the observation is unusual.",
      "It is 2.4 standard deviations above the mean and would generally be considered unusual.",
      "A positive z-score places the observation above the mean, and its magnitude gives the distance in standard deviations. Since 2.4 exceeds 2, it lies in a relatively uncommon upper region.",
      ["2.4 standard deviations above the mean; unusual", "unusually high", "above the mean by 2.4 standard deviations"]
    ),
  ],
  "statistical-analysis-exam-practice": [
    q(
      "Package masses are approximately normal with mean 500 g and standard deviation 40 g. Estimate the percentage between 460 g and 580 g using the empirical rule.",
      "About 81.5%",
      "The interval runs from one standard deviation below the mean to two above. This contains 34% + 34% + 13.5% = 81.5% by the empirical rule.",
      ["81.5%", "approximately 81.5 percent", "about 81.5"]
    ),
    q(
      "Package masses are approximately normal with mean 500 g and standard deviation 40 g. Estimate the cutoff for the lowest 2.5% using the empirical rule.",
      "420 g",
      "The lowest 2.5% lies approximately below two standard deviations under the mean. The cutoff is 500 - 2(40) = 420 g.",
      ["420", "420g", "approximately 420 g"]
    ),
    q(
      "A score of 72 comes from a distribution with mean 60 and standard deviation 6. A score of 85 comes from a distribution with mean 70 and standard deviation 10. Compare their relative standings.",
      "The score of 72 has the higher relative standing",
      "The first score has z = (72 - 60) / 6 = 2. The second has z = (85 - 70) / 10 = 1.5, so 72 is further above its distribution mean in standard-deviation units.",
      ["72 is relatively higher", "the first score because z=2", "72 has z 2 compared with 1.5"]
    ),
  ],
};

const NETWORKS_D5: Record<string, EditorialQuestion[]> = {
  "network-flow-revision": [
    q(
      "A weighted network has edges AB = 4, AC = 7, BC = 2, BD = 6 and CD = 3. Find the shortest distance from A to D and give the route.",
      "9 via A-B-C-D",
      "The main route totals are A-B-D = 10, A-C-D = 10 and A-B-C-D = 4 + 2 + 3 = 9. Therefore the shortest distance is 9 via A-B-C-D.",
      ["A-B-C-D, 9", "9 units via ABCD", "9"]
    ),
    q(
      "For the same network with AB = 4, AC = 7, BC = 2, BD = 6 and CD = 3, find a minimum spanning tree and its total weight.",
      "BC, CD and AB; total 9",
      "Choose the smallest edges without making a cycle: BC = 2, CD = 3 and AB = 4 connect all four vertices. Their total weight is 2 + 3 + 4 = 9.",
      ["AB BC CD, 9", "BC+CD+AB=9", "total weight 9"]
    ),
    q(
      "At an intermediate flow vertex, inflows are 12 and 7 units per minute. Outflows are 8 and x units per minute. Find x.",
      "11 units per minute",
      "Flow conservation requires total inflow to equal total outflow. Thus 12 + 7 = 8 + x, so x = 11 units per minute.",
      ["11", "11 units/min", "11 units per minute"]
    ),
  ],
  "network-concepts-terminology": [
    q(
      "The sum of the degrees of all vertices in an undirected network is 18. Find the number of edges and justify your answer.",
      "9 edges",
      "Each edge contributes one degree at each endpoint, so the degree sum counts every edge twice. Therefore the number of edges is 18 / 2 = 9.",
      ["9", "nine edges", "9 edges"]
    ),
    q(
      "A connected network has vertex degrees A = 2, B = 3, C = 3 and D = 2. Determine whether it has an Euler trail, and state possible start and finish vertices.",
      "Yes; it must start at B and finish at C, or vice versa",
      "Exactly two vertices, B and C, have odd degree. A connected network with exactly two odd vertices has an Euler trail whose endpoints are those two vertices.",
      ["yes, B to C", "yes, C to B", "Euler trail with endpoints B and C"]
    ),
    q(
      "A connected network has 12 vertices and contains no cycles. How many edges must it have, and what type of network is it?",
      "11 edges; a tree",
      "A connected acyclic network is a tree, and every tree with n vertices has n - 1 edges. With 12 vertices, it must have 11 edges.",
      ["11, tree", "a tree with 11 edges", "11 edges"]
    ),
  ],
  "shortest-paths-minimum-spanning-trees": [
    q(
      "Routes from P to T have lengths P-Q-T = 13, P-R-T = 11 and P-Q-R-T = 9. Find the shortest path and explain why selecting the smallest first edge alone is insufficient.",
      "P-Q-R-T with length 9",
      "Comparing complete route totals gives 13, 11 and 9, so P-Q-R-T is shortest. A locally smallest edge need not lead to the smallest total route, so the whole accumulated distance matters.",
      ["P-Q-R-T, 9", "PQRT length 9", "9 via P-Q-R-T"]
    ),
    q(
      "Explain the difference between a shortest path from A to B and a minimum spanning tree for the same network.",
      "A shortest path minimises one route from A to B; a minimum spanning tree connects every vertex with minimum total edge weight and no cycles.",
      "The objectives differ: shortest-path work serves two specified endpoints, while a minimum spanning tree is a network-wide connection problem involving all vertices without redundant cycles.",
      ["shortest path joins two vertices; MST connects all vertices", "one route versus minimum total connection of every vertex", "an MST spans all vertices without cycles"]
    ),
    q(
      "A new edge reduces the shortest A-to-D route but creates a cycle when added to an existing minimum spanning tree. Explain how the edge can help one problem without automatically improving the other.",
      "Shortest paths and spanning trees optimise different objectives; the edge may shorten A-to-D but must replace another edge to form a valid lower-weight tree.",
      "A shortest route may freely use the new edge. A spanning tree cannot contain a cycle, so adding it requires removing an edge, and the resulting total must be compared before claiming improvement.",
      ["the objectives differ and an MST cannot contain a cycle", "it may shorten one route but not lower total tree weight", "the edge must replace another edge in the spanning tree"]
    ),
  ],
  "network-flow-capacity-cuts": [
    q(
      "A flow network has capacities S-A = 8, S-B = 6, A-T = 5, A-B = 3 and B-T = 7. Find the maximum S-to-T flow.",
      "12",
      "The total capacity entering T is 5 + 7 = 12, giving an upper bound. It is achievable by sending 8 through A, with 5 to T and 3 to B, plus 4 directly from S to B, so the maximum is 12.",
      ["12", "12 units", "maximum flow 12"]
    ),
    q(
      "A cut separating the source side from the sink side crosses edges with capacities 4, 7 and 3. Find the cut capacity and explain its significance.",
      "14; no feasible flow can exceed 14",
      "Cut capacity is the sum of capacities directed across the cut: 4 + 7 + 3 = 14. Every source-to-sink flow must cross the cut, so 14 is an upper bound on maximum flow.",
      ["14", "capacity 14, an upper bound", "14 units; maximum flow is at most 14"]
    ),
    q(
      "An engineer increases one edge capacity by 5, but the capacity of a different minimum cut is unchanged. Explain why the maximum flow may not increase.",
      "The unchanged minimum cut remains a bottleneck, so it still imposes the same upper bound on total flow.",
      "Increasing a non-limiting edge does not remove every bottleneck. If another cut of the original minimum capacity remains, the max-flow min-cut result keeps the maximum flow unchanged.",
      ["another minimum cut still limits the flow", "the bottleneck cut is unchanged", "capacity elsewhere does not overcome the minimum cut"]
    ),
  ],
  "critical-path-revision": [
    q(
      "Activity A takes 4 days. After A, activities B and C take 6 and 3 days in parallel. Activity D takes 5 days after both finish. Find the project duration and critical path.",
      "15 days; A-B-D",
      "The two complete paths are A-B-D = 4 + 6 + 5 = 15 days and A-C-D = 4 + 3 + 5 = 12 days. The longer path A-B-D controls the 15-day duration.",
      ["A-B-D, 15 days", "15 via ABD", "15 days"]
    ),
    q(
      "Using the project where A = 4 days, B = 6 days, C = 3 days and D = 5 days, with B and C parallel after A, find the total float of C.",
      "3 days",
      "The critical A-B-D path lasts 15 days, while A-C-D lasts 12 days. Activity C can therefore be delayed by 15 - 12 = 3 days without delaying completion.",
      ["3", "3 days", "three days"]
    ),
    q(
      "In that project, activity B on the critical path is delayed by 2 days and no other duration changes. Find the new completion time.",
      "17 days",
      "B has zero float because it lies on the critical path. A two-day delay extends A-B-D from 15 to 17 days, so project completion also moves to 17 days.",
      ["17", "17 days", "seventeen days"]
    ),
  ],
  "critical-path-analysis": [
    mcq(
      "Paths in a project are A-B-D-F = 13 days and A-C-E-F = 16 days. Which statement is correct?",
      "C",
      ["Both paths are critical", "A-B-D-F is critical with 3 days float", "A-C-E-F is critical and controls a 16-day duration", "The project duration is 29 days"],
      "Parallel path durations are not added. The longest start-to-finish path is A-C-E-F at 16 days, so it is critical and controls completion."
    ),
    q(
      "For paths A-B-D-F = 13 days and A-C-E-F = 16 days, find the total float available to the shorter branch, assuming the paths share only A and F.",
      "3 days",
      "The project is controlled by the 16-day path. The shorter branch takes 13 days, so it has 16 - 13 = 3 days of total float before it delays completion.",
      ["3", "3 days", "three days"]
    ),
    mcq(
      "A manager can shorten one activity by one day at equal cost. Which choice can reduce a project with critical path A-C-E-F?",
      "A",
      ["Shorten C or E, provided the critical path remains unique", "Shorten B only", "Shorten any activity with positive float", "Shorten an activity not connected to F"],
      "Only shortening an activity on the current critical path can immediately reduce its length. The network must then be recalculated because another path may become critical."
    ),
  ],
  "gantt-charts-dummy-activities": [
    q(
      "Activity A takes 4 days. Activities B and C then run in parallel for 3 and 5 days. Activity D takes 2 days after both finish. Find the earliest project completion time.",
      "11 days",
      "A finishes at day 4. B then finishes at day 7 and C at day 9, so D must wait until day 9 and finishes at day 11.",
      ["11", "11 days", "day 11"]
    ),
    q(
      "Explain why a dummy activity can appear in an activity-on-arrow network even though it has zero duration.",
      "It records a precedence relationship without adding time or work.",
      "A dummy activity distinguishes dependency logic that the arrows could otherwise represent ambiguously. Its duration is zero because it models no actual task."
      , ["it shows precedence with no duration", "it preserves dependency logic", "a zero-time arrow represents a required dependency"]
    ),
    q(
      "A Gantt chart schedules two activities at the same time, but both require the only available crane. Identify the issue and state an appropriate adjustment.",
      "There is a resource conflict; reschedule one activity while respecting precedence and float.",
      "Logical precedence alone does not guarantee a feasible schedule. With one crane, the activities cannot overlap, so one must move to an available period, preferably within its float.",
      ["resource conflict; delay one task", "level the resource by rescheduling one activity", "one activity must be moved because only one crane is available"]
    ),
  ],
  "networks-exam-practice": [
    q(
      "A road planner needs the least-distance route between two depots, while a cable planner must connect all sites at minimum total cost. Name the appropriate network method for each task.",
      "Shortest path for the depots; minimum spanning tree for all sites",
      "The road question has two specified endpoints, so it is a shortest-path problem. The cable question must connect every site without unnecessary cycles, so it requires a minimum spanning tree.",
      ["shortest path, then MST", "depots: shortest path; sites: minimum spanning tree", "shortest route and minimum spanning tree"]
    ),
    q(
      "A network has a feasible flow of 18 units and a source-to-sink cut of capacity 18. Prove that the flow is maximum.",
      "The flow equals the cut capacity, so no larger flow is possible and 18 is maximum.",
      "Every feasible flow is at most the capacity of any cut. Since a flow of 18 is achieved and a cut also gives the upper bound 18, the max-flow min-cut condition proves optimality.",
      ["18 is maximum by max-flow min-cut", "flow equals cut capacity", "the achieved lower bound and cut upper bound are both 18"]
    ),
    q(
      "A non-critical activity has 4 days of total float and is delayed by 3 days. Explain the effect on project completion, assuming no other changes.",
      "Project completion is unchanged, with 1 day of float remaining.",
      "The three-day delay is smaller than the available four-day float, so it does not reach the critical completion constraint. The activity retains 4 - 3 = 1 day of float.",
      ["no delay; 1 day float remains", "completion unchanged", "one day of float remains"]
    ),
  ],
};

const EXPLANATION_REWRITES: Record<string, string> = {
  "y12s2-alr-g2": "Substitute x = 4 into y = 3x - 5: y = 3(4) - 5 = 12 - 5 = 7.",
  "y12s2-alr-g3": "In gradient-intercept form y = mx + b, the coefficient of x is the gradient. Here m = -3.",
  "y12s2-alr-i2": "Set y = 0 in 0 = -2x + 10. Then 2x = 10, so the x-intercept occurs at x = 5.",
  "y12s2-alr-i4": "Substitute x = 3 into y = 5x - 8: y = 5(3) - 8 = 15 - 8 = 7.",
  "y12s2-alr-m4": "Substitute y = 4 into 4 = -x + 12. Rearranging gives x = 12 - 4 = 8.",
  "y12s2-alr-m6": "Divide 2(x - 3) = 10 by 2 to get x - 3 = 5, then add 3 to obtain x = 8.",
  "y12s2-expinv-g4": "For y = 50/x, replacing x by 2x gives 50/(2x), which is half the original value of y.",
  "y12s2-expinv-i4": "The equation has the form y = k/x with constant k = 24, so it represents inverse variation.",
  "y12s2-rec-g2": "Substitute x = 3 into y = 6/x to obtain y = 6/3 = 2.",
  "y12s2-rec-g3": "For y = k/x, multiply the coordinates to find k: k = xy = 2(10) = 20.",
  "y12s2-rec-g4": "Substitute y = 5 into 5 = 20/x. Multiplying by x and dividing by 5 gives x = 4.",
  "y12s2-rec-i2": "A rectangular hyperbola y = k/x has k = xy. Using (3, 8), k = 3(8) = 24.",
  "y12s2-rec-i4": "Set 6 = 30/x. Since 6x = 30, dividing by 6 gives x = 5.",
  "y12s2-rec-m2": "Substitute x = 2 into y = 8/x, giving y = 8/2 = 4.",
  "y12s2-rec-m4": "Substitute x = 8 into y = 24/x, giving y = 24/8 = 3.",
  "y12s2-rec-m6": "The point (5, 4) gives k = xy = 20. Then 10 = 20/x, so x = 2.",
  "y12s2-sim-g4": "Evaluate both hire models at the stated time. Company A costs $150 and Company B costs $140, so B is cheaper by $10.",
  "y12s2-ineq-g1": "Subtract 3 from 2x + 3 <= 11 to get 2x <= 8, then divide by 2: x <= 4.",
  "y12s2-ineq-g2": "Add 2 to 5x - 2 > 13 to get 5x > 15, then divide by 5: x > 3.",
  "y12s2-ineq-g4": "The inequality h <= 6 includes 6 and every smaller non-negative time, so no more than 6 hours may be hired.",
  "y12s2-ineq-i3": "Total use is 6 + r and cannot exceed 15, so 6 + r <= 15. Subtracting 6 gives r <= 9.",
  "y12s2-ineq-m1": "Add 1 to 4x - 1 <= 15 to get 4x <= 16, then divide by 4: x <= 4.",
  "y12s2-ineq-m6": "Subtract 15 from 15 + 4n <= 55 to get 4n <= 40. Dividing by 4 gives n <= 10.",
  "y12s2-form-g1": "Substitute into the compound formula: A = 1000(1.04 squared) = 1000(1.0816) = $1081.60.",
  "y12s2-form-g2": "Rearrange S = D/T to D = ST. Therefore D = 80(3) = 240 km.",
  "y12s2-form-g4": "BMI = 70/(1.75 squared) = 70/3.0625 = 22.857..., which rounds to 22.9.",
  "y12s2-form-i2": "Rearrange D = M/V to M = DV. Thus M = 3(40) = 120 g.",
  "y12s2-form-i3": "Starting with A = lw, divide both sides by w. This isolates the length and gives l = A/w.",
  "y12s2-form-m1": "Substitute P = 3000, r = 0.05 and n = 2: A = 3000(1.05 squared) = $3307.50.",
  "y12s2-form-m2": "Rearrange S = D/T to T = D/S. Then T = 225/75 = 3 hours.",
  "y12s2-form-m4": "Use D = M/V: D = 90/30 = 3 grams per cubic centimetre.",
  "y12s2-form-m7": "A 10% annual loss leaves a factor of 0.90. Thus V = 20,000(0.90 squared) = $16,200.",
  "y12s2-rad-g2": "Convert degrees to radians by multiplying by pi/180: 60(pi/180) = pi/3 radians.",
  "y12s2-rad-g3": "The opposite side is 10 sin(pi/3) = 10 sin60 degrees = 8.66 m, to 2 decimal places.",
  "y12s2-rad-g4": "Convert radians to degrees by multiplying by 180/pi: (pi/4)(180/pi) = 45 degrees.",
  "y12s2-rad-i3": "The ladder is the hypotenuse, so the height is 6 sin(pi/3) = 5.196..., or 5.20 m.",
  "y12s2-rad-i5": "The angle values are expressed in radians, so the calculator must use RAD mode before evaluating trigonometric ratios.",
  "y12s2-rad-m7": "The adjacent side is 20 cos(pi/6) = 20 cos30 degrees = 17.32 m, to 2 decimal places.",
  "y12s2-eld-g3": "Use tangent because the height is opposite and 60 m is adjacent: h = 60 tan52 degrees = 76.8 m.",
  "y12s2-trv-g2": "The known side-angle pair and the required side with its opposite angle form matched pairs, so the sine rule applies.",
  "y12s2-amb-g2": "The second sine-rule angle is supplementary to the first: B2 = 180 degrees - 65.4 degrees = 114.6 degrees.",
  "y12s2-amb-i3": "Both candidate angles leave a positive third angle: 180 - 25 - 49.5 = 105.5 degrees and 180 - 25 - 130.5 = 24.5 degrees. Therefore two triangles exist.",
  "y12s2-amb-i5": "SSA data provide a side and its opposite angle plus another side, so the sine rule creates the required side-angle proportion.",
  "y12s2-eco-g3": "Cost equals energy multiplied by the tariff: 5 kWh($0.30 per kWh) = $1.50.",
  "y12s2-sdp-g3": "At scale 1:50, plan length is actual length divided by 50. Since 5 m = 500 cm, 500/50 = 10 cm.",
  "y12s2-rvc-g3": "One cubic metre contains 1000 litres, so a volume calculated in cubic metres is multiplied by 1000 to express it in litres.",
  "y12s2-rvc-i4": "Convert 80 mm to 0.08 m. The rainfall volume is 500(0.08) = 40 cubic metres = 40 kL, which exceeds the 35 kL capacity by 5 kL.",
  "y12s2-rvc-m7": "A kilolitre is one thousand litres: the prefix kilo means 1000, so 1 kL = 1000 L.",
  "y12s2-bear-i4": "Both routes are measured clockwise from north at the same starting point, so their included angle is the absolute difference between the two bearings.",
  "y12s2-tz-g3": "Sydney is 6 hours ahead of Dubai because +10 - +4 = 6. Subtracting 6 hours from noon gives 6:00 am in Dubai.",
  "y12s2-tz-g4": "11:00 pm Monday in Sydney is 1:00 pm Monday UTC. After 8 hours it is 9:00 pm UTC, which is 6:00 am Tuesday in Tokyo.",
  "y12s2-tz-i5": "The International Date Line follows approximately the 180-degree meridian, with deviations to avoid dividing countries and island groups.",
  "y12s2-tz-m7": "6:00 pm Friday in Sydney is 8:00 am Friday UTC. Adding 22 hours gives 6:00 am Saturday UTC, which is also London time here.",
  "y12s2-rate-exam-i5": "Two hours 20 minutes is 2 + 20/60 = 2.333... hours. The correct speed is 168/2.333... = 72 km/h, so 168 km/h used the time incorrectly.",
  "y12s2-sa-g4": "A closed rectangular box has 6 faces. Removing the top leaves the base and four side faces, so 5 faces contribute.",
  "y12s2-vol-g4": "Since 1000 cubic centimetres equals 1 litre, divide 3500 by 1000 to obtain 3.5 L.",
  "y12s2-sdb-g2": "Dividend yield is annual dividend divided by share price: $0.20/$4.00 = 0.05, which is 5%.",
  "y12s2-sdb-g3": "The shares cost 100($5.00) = $500. Brokerage is 1% of $500, or $5, so the total purchase cost is $505.",
  "y12s2-sdb-i3": "The gain per share is $3.50 - $2.50 = $1.00. Across 200 shares, the capital gain is 200($1.00) = $200.",
  "y12s2-sdb-i5": "Gross sale proceeds are 500($4.00) = $2000. Brokerage is 0.5% of $2000, or $10, leaving net proceeds of $1990.",
  "y12s2-sld-g3": "A 20% annual loss leaves 100% - 20% = 80% of the value, so the declining-balance decay factor is 0.80.",
  "y12s2-sld-i5": "Straight-line value is $10,000 - 3($1500) = $5500. Declining-balance value is $10,000(0.80 cubed) = $5120, so straight-line is higher.",
  "y12s2-ann-g4": "The balances fall from $8000 to $7700 to $7395. Each repayment removes more than the interest added, so the outstanding loan is decreasing.",
  "y12s2-ift-g2": "A future-value annuity factor gives the accumulated value of $1 paid each period. Multiplying it by the regular payment gives the account's future value.",
  "y12s2-ift-i5": "Use FV = payment times factor, so payment = 8000/26.973 = $296.59..., which rounds to $296.60 per month.",
  "y12s2-rap-g4": "Accumulation asks for the future value of repeated contributions. Multiply the regular contribution M by the matching future-value annuity factor.",
  "y12s2-inv-g4": "Using the approximate real-return rule, real return = nominal rate - inflation = 2% - 4% = -2%.",
  "y12s2-inv-i4": "With the savings rate fixed at 3%, increasing inflation to 4% gives an approximate real return of 3% - 4% = -1%.",
  "y12s2-credit-g4": "Repayment includes the purchase balance plus any interest and fees. These additions cannot make the total less than the original purchase price.",
  "y12s2-biv-g2": "Delivery distance is used as the input that explains or predicts delivery time, so distance is the explanatory variable.",
  "y12s2-biv-g3": "A downward direction gives a negative association, and the tight clustering around a line makes the linear association strong.",
  "y12s2-biv-i2": "Performance score is the measured outcome being explained by training hours, so it is the response variable.",
  "y12s2-biv-i3": "A point separated from the main pattern is an outlier because its values do not follow the cluster formed by most observations.",
  "y12s2-biv-i4": "The upward direction indicates positive association, while points close to the line indicate that the association is strong.",
  "y12s2-biv-m4": "The trend falls as x increases, so it is negative. The points remain close to a line, so the association is strong and linear.",
  "y12s2-biv-m5": "Delivery time is the outcome predicted from distance, so time is the response variable in this model.",
  "y12s2-biv-m6": "A point lying well away from the main cluster is called an outlier because it does not follow the dominant data pattern.",
  "y12s2-corr-g2": "The line slopes downward, indicating negative direction, and the points lie close to it, indicating strong linear association.",
  "y12s2-corr-g3": "The coefficient 0.88 is positive and close to 1, so it represents a strong positive linear association.",
  "y12s2-corr-i2": "The coefficient -0.93 is negative and close to -1, indicating a strong negative linear association.",
  "y12s2-corr-i3": "A correlation of 0.06 is very close to zero, so there is little or no linear association, although a nonlinear pattern could still exist.",
  "y12s2-corr-i4": "The negative sign gives the direction, while a magnitude of 0.65 indicates moderate linear strength. The separated point is an outlier.",
  "y12s2-corr-i5": "Rainfall can independently increase umbrella sales and slow traffic, so it is a plausible lurking variable behind the observed association.",
  "y12s2-corr-m4": "Because -0.81 is negative and has magnitude close to 1, it describes a strong negative linear association.",
  "y12s2-corr-m5": "The value 0.03 is almost zero, which suggests weak or no linear association between the variables.",
  "y12s2-corr-m7": "An upward slope gives positive direction, and tight packing around the line makes the linear association strong.",
  "y12s2-reg-i5": "The intercept predicts the response at x = 0. It has a contextual interpretation only when zero is possible and meaningful for the explanatory variable.",
  "y12s2-reg-m7": "Residual equals actual minus predicted. A positive result means the actual observation lies above the model's predicted value.",
  "y12s2-prv-g3": "There are 5 + 3 + 2 = 10 marbles and 2 are green, so P(green) = 2/10 = 1/5.",
  "y12s2-prv-i4": "The ordered outcomes are HH, HT, TH and TT, giving four outcomes in the two-toss sample space.",
  "y12s2-relfreq-g4": "Relative frequency is event count divided by total trials. Here 18/60 = 0.30, so the estimated probability is 0.30.",
  "y12s2-msi-g2": "For independent events, multiply the probabilities: P(A and B) = 0.4(0.3) = 0.12.",
  "y12s2-msi-g3": "The two tosses are independent, so P(HH) = (1/2)(1/2) = 1/4 = 0.25.",
  "y12s2-msi-g4": "Each spin has 4 outcomes. Two ordered spins therefore produce 4 times 4 = 16 possible outcomes.",
  "y12s2-msi-i3": "The coin and die are independent, so P(Heads and 4) = (1/2)(1/6) = 1/12.",
  "y12s2-msi-i5": "Without replacement, the first card changes both the deck size and its composition, so the probability for the second draw depends on the first.",
  "y12s2-msi-m6": "There are 16 ordered pairs. The favourable pairs are (2,1), (3,1), (3,2), (4,1), (4,2) and (4,3), so the probability is 6/16 = 3/8.",
  "y12s2-eft-g2": "Add all four cells in the sport table, or add its marginal totals. The counts sum to 100 people surveyed.",
  "y12s2-eft-g3": "The table contains 40 females out of 100 respondents, so P(Female) = 40/100 = 0.40.",
  "y12s2-eft-g4": "The Male-and-Sport cell contains 45 people out of the 100 surveyed, so the joint probability is 45/100 = 0.45.",
  "y12s2-eft-i3": "There are 18 + 10 = 28 failures among 140 students. Thus P(Fail) = 28/140 = 0.20.",
  "y12s2-eft-i4": "Read the Year 11 row and Pass column at their intersection. That cell contains 72 students.",
  "y12s2-eft-m6": "The No Sport total is 25 out of 100 respondents, so P(No Sport) = 25/100 = 0.25.",
  "y12s2-normal-g4": "The empirical rule states that approximately 68% of observations in a normal distribution lie within one standard deviation of the mean.",
  "y12s2-normal-i4": "By the empirical rule, approximately 95% of normal data lies between two standard deviations below and above the mean.",
  "y12s2-normal-m7": "A negative z-score lies below the mean, and its magnitude is the distance in standard deviations. Thus -1.25 means 1.25 standard deviations below.",
  "y12s2-stat-exam-i5": "The normal empirical rule places approximately 95% of observations within two standard deviations of the mean.",
  "y12s2-stat-exam-m6": "The prediction extends beyond the observed explanatory-variable range. This extrapolation is uncertain because the fitted trend may not continue there.",
  "y12s2-nfr-g3": "Add the weights of the consecutive edges on A-B-C: 5 + 3 = 8. The direct A-C edge is not part of this specified path.",
  "y12s2-nfr-g4": "The arrow fixes the permitted direction. A directed edge A to B allows movement from A toward B, not automatically from B back to A.",
  "y12s2-nfr-i4": "A circuit is a connected route that returns to its initial vertex, so its starting and finishing vertices are the same.",
  "y12s2-nfr-i5": "Vertex degree counts the edges incident to, or directly touching, that vertex. Each such connection contributes one to the degree.",
  "y12s2-net-term-g4": "The numbers label the travel time along each connection, so 5 minutes and 3 minutes are the edge weights.",
  "y12s2-net-term-i4": "The route begins at A and returns to A after visiting B and C. A closed route of this kind is a circuit.",
  "y12s2-net-term-i5": "The path A-C-D uses edges AC and CD. Add their cable lengths once each: 90 m + 110 m = 200 m.",
  "y12s2-net-term-m7": "A one-way road permits travel in only one direction, so its network edge needs an arrow and is represented as directed.",
  "y12s2-spmst-i5": "The courier has a specified start and destination and wants minimum travel time, which is exactly a shortest-path problem.",
  "y12s2-flow-g2": "A feasible arc flow cannot exceed capacity. Since 7 is less than the capacity 10, the proposed flow satisfies the constraint.",
  "y12s2-flow-m7": "Total flow is constrained by the least-capable relevant section. A low-capacity arc or cut therefore acts as a bottleneck.",
  "y12s2-cpr-g3": "Parallel project paths finish only when the longest path finishes. The maximum of 10, 14 and 12 is 14 days.",
  "y12s2-cpr-i3": "A critical activity cannot be delayed without moving project completion, so its available scheduling float is zero.",
  "y12s2-cpr-i5": "Activity C cannot start until B finishes at time 7. Adding C's 5-day duration gives earliest finish time 7 + 5 = 12.",
  "y12s2-cpr-m7": "A critical-path activity has zero float. A two-day delay therefore extends the controlling path and project completion by two days.",
  "y12s2-cpa-g4": "The two-day delay uses only 2 of E's 3 days of float. One day remains, so project completion does not change.",
  "y12s2-gcd-g3": "Tracing the longest start-to-finish dependency chain in Project Alpha gives B-D-E-F. These zero-float activities form the critical path.",
  "y12s2-gcd-i4": "A Gantt bar starts at the earliest start time and extends for the activity duration. Starting at day 2 for 3 days ends at day 5.",
  "y12s2-gcd-m6": "Activity B lies on Project Alpha's critical path, so increasing its duration by one day increases the minimum completion time from 12 to 13 days.",
  "y12s2-gcd-m7": "The solid bar shows scheduled work. The dashed extension after it shows how far a non-critical activity may move without delaying the project.",
  "y12s2-net-exam-g3": "The activity uses 2 of its 4 available float days, leaving 2 days. Because the float is not exhausted, completion time is unchanged.",
  "y12s2-net-exam-i5": "Shortest time is only one decision criterion. The 14-minute route may be preferable because avoiding an unsafe crossing can outweigh the extra two minutes.",
};

function toPracticeQuestion(
  original: PracticeQuestion,
  spec: EditorialQuestion
): PracticeQuestion {
  return {
    ...original,
    prompt: spec.prompt,
    latex: spec.choices ? "\\text{Select A, B, C, or D.}" : "",
    answer: spec.answer,
    acceptedAnswers: spec.acceptedAnswers ?? [],
    choices: spec.choices?.map((text, index) => ({
      label: ["A", "B", "C", "D"][index],
      text,
    })),
    hint: "",
    explanation: spec.explanation,
  };
}

function rewriteExplanations(questions: PracticeQuestion[]): PracticeQuestion[] {
  return questions.map((question) => ({
    ...question,
    explanation: EXPLANATION_REWRITES[question.id] ?? question.explanation,
  }));
}

function addEditorialVisuals(lesson: ExplicitLesson): ExplicitLesson {
  const workedExamples = [...lesson.workedExamples];
  if (!workedExamples.length) return lesson;

  switch (lesson.slug) {
    case "working-with-formulae-substitution":
      workedExamples[0] = {
        ...workedExamples[0],
        planeShapeDiagram: undefined,
      };
      break;
    case "ambiguous-case-sine-rule":
      workedExamples[0] = {
        ...workedExamples[0],
        triangleDiagram: {
          description: "SSA triangle with angle A equal to 45 degrees, opposite side a equal to 7, and side b equal to 9; these measurements can produce two values of angle B.",
          vertices: { A: { x: 0, y: 0 }, B: { x: 8, y: 0 }, C: { x: 5, y: 5 } },
          sideLabels: { BC: "a = 7", AC: "b = 9" },
          angleLabels: { A: "45 degrees" },
        },
      };
      break;
    case "bearings-navigation-problems":
      workedExamples[0] = {
        ...workedExamples[0],
        bearingsDiagram: {
          description: "Navigation diagram from port A showing the ship's outward bearing of 050 degrees to point B; the question asks for the reverse bearing from B.",
          originLabel: "A",
          rays: [{ bearing: 50, label: "B", showAngle: true }],
        },
      };
      break;
    case "scale-drawings-site-plans":
      workedExamples[0] = {
        ...workedExamples[0],
        planeShapeDiagram: {
          description: "Rectangular room on a 1 to 100 plan, measuring 4.5 centimetres by 3.2 centimetres on the drawing.",
          vertices: [
            { x: 0, y: 0, rightAngle: true },
            { x: 4.5, y: 0, rightAngle: true },
            { x: 4.5, y: 3.2, rightAngle: true },
            { x: 0, y: 3.2, rightAngle: true },
          ],
          edges: [{ label: "4.5 cm" }, { label: "3.2 cm" }, {}, {}],
        },
      };
      break;
    case "energy-consumption-watts-kilowatts":
      workedExamples[0] = {
        ...workedExamples[0],
        barChartDiagram: {
          description: "Energy calculation for a 2.4 kilowatt oven used for 2.5 hours, producing 6 kilowatt-hours of energy use.",
          bars: [{ label: "Oven: 2.4 kW for 2.5 h", value: 6 }],
          valueAxisLabel: "Energy (kWh)",
          orientation: "horizontal",
        },
      };
      break;
    case "rainfall-volume-calculations":
      workedExamples[0] = {
        ...workedExamples[0],
        planeShapeDiagram: {
          description: "Rectangular roof catchment 12 m by 10 m used to convert rainfall depth into collected volume.",
          vertices: [{ x: 0, y: 0, rightAngle: true }, { x: 12, y: 0, rightAngle: true }, { x: 12, y: 10, rightAngle: true }, { x: 0, y: 10, rightAngle: true }],
          edges: [{ label: "12 m" }, { label: "10 m" }, {}, {}],
        },
      };
      break;
    case "time-zones-conversions":
      workedExamples[0] = {
        ...workedExamples[0],
        numberLineDiagram: {
          description: "UTC offset line marking London, Dubai, Tokyo and Sydney for time-zone conversion.",
          min: 0,
          max: 10,
          step: 1,
          axisLabel: "UTC offset (hours)",
          points: [{ value: 0, label: "London" }, { value: 4, label: "Dubai" }, { value: 9, label: "Tokyo" }, { value: 10, label: "Sydney" }],
        },
      };
      break;
    case "surface-area-prisms-cylinders":
      workedExamples[0] = {
        ...workedExamples[0],
        solid3DDiagram: {
          description: "Rectangular prism with length 8 centimetres, width 5 centimetres, and height 3 centimetres for a surface-area calculation.",
          solid: "rectangularPrism",
          labels: { length: "8 cm", width: "5 cm", height: "3 cm" },
        },
      };
      break;
    case "volume-prisms-cylinders-spheres":
      workedExamples[0] = {
        ...workedExamples[0],
        solid3DDiagram: {
          description: "Cylinder with radius 5 centimetres and perpendicular height 12 centimetres for a volume calculation.",
          solid: "cylinder",
          labels: { radius: "5 cm", height: "12 cm" },
        },
      };
      break;
    case "composite-solids-practical":
      workedExamples[0] = {
        ...workedExamples[0],
        compositeSolidDiagram: {
          description: "Composite solid formed by a cylinder of radius 3 centimetres and height 8 centimetres standing on a rectangular prism 8 centimetres long, 8 centimetres wide, and 4 centimetres high.",
          kind: "cylinderOnRectangularPrism",
          unit: "cm",
          base: { length: 8, width: 8, height: 4 },
          cylinder: { radius: 3, height: 8 },
        },
        solid3DDiagram: undefined,
      };
      break;
    case "shares-dividends-brokerage":
      workedExamples[0] = {
        ...workedExamples[0],
        barChartDiagram: undefined,
      };
      break;
    case "financial-decision-making-exam-practice":
      workedExamples[0] = {
        ...workedExamples[0],
        barChartDiagram: undefined,
      };
      break;
    case "bivariate-data-revision":
      workedExamples[0] = {
        ...workedExamples[0],
        scatterPlotDiagram: undefined,
      };
      break;
    case "normal-distribution-revision":
      workedExamples[0] = {
        ...workedExamples[0],
        normalDistributionDiagram: {
          description: "Normal distribution of test scores with mean 70, standard deviation 8, and score 86 marked two standard deviations above the mean.",
          mean: 70,
          standardDeviation: 8,
          axisLabel: "test score",
          showStandardDeviationLabels: true,
          markers: [{ value: 86, label: "86", zScore: 2 }],
        },
      };
      break;
    case "statistical-analysis-exam-practice":
      workedExamples[0] = {
        ...workedExamples[0],
        scatterPlotDiagram: {
          description: "Scatterplot of study hours against test score, with points following a strong upward linear pattern and no major outliers.",
          xAxisLabel: "Study hours",
          yAxisLabel: "Test score",
          points: [{ x: 1, y: 46 }, { x: 2, y: 53 }, { x: 3, y: 57 }, { x: 4, y: 65 }, { x: 5, y: 71 }, { x: 6, y: 77 }],
        },
        normalDistributionDiagram: undefined,
      };
      break;
    case "network-flow-capacity-cuts":
      workedExamples[0] = {
        ...workedExamples[0],
        diagram: {
          description: "Single directed arc from A to B labelled with capacity 12; the proposed flow of 9 is compared with that capacity.",
          vertices: [{ id: "A", label: "A", x: 50, y: 100 }, { id: "B", label: "B", x: 300, y: 100 }],
          edges: [{ from: "A", to: "B", weight: 12, directed: true }],
        },
      };
      break;
    case "networks-exam-practice":
      workedExamples[0] = {
        ...workedExamples[0],
        diagram: undefined,
      };
      break;
    default:
      return lesson;
  }

  return { ...lesson, workedExamples };
}

export function applyYear12Standard2EditorialRemediation(
  lesson: ExplicitLesson
): ExplicitLesson {
  const d5 =
    ALGEBRA_D5[lesson.slug] ??
    TRIG_D5[lesson.slug] ??
    RATES_D5[lesson.slug] ??
    MEASUREMENT_D5[lesson.slug] ??
    INVESTMENT_D5[lesson.slug] ??
    ANNUITIES_D5[lesson.slug] ??
    BIVARIATE_D5[lesson.slug] ??
    PROBABILITY_D5[lesson.slug] ??
    NORMAL_D5[lesson.slug] ??
    NETWORKS_D5[lesson.slug];
  if (!d5) return lesson;

  return addEditorialVisuals({
    ...lesson,
    guidedPractice: rewriteExplanations(lesson.guidedPractice),
    independentPractice: rewriteExplanations(lesson.independentPractice),
    masteryQuiz: [
      ...lesson.masteryQuiz.slice(0, 7),
      ...d5.map((spec, index) =>
        toPracticeQuestion(lesson.masteryQuiz[index + 7], spec)
      ),
    ].map((question) => ({
      ...question,
      explanation: EXPLANATION_REWRITES[question.id] ?? question.explanation,
    })),
  });
}
