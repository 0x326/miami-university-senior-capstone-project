# Experiment Format

```javascript
{
  name: "Addiction Study 12",
  primaryExperimenter: "Quinn",
  dateInitialized: <timestamp>,
  lastUpdated: <timestamp>,
  isComplete: false,
  totalSessions: 30,
  totalColsBegin: 8,
  totalColsMid: 6,
  totalColsEnd: 4,
  subSessionLabelsBegin: [
    "Cage Weight",
    "Cage",
    ["H20 Weights", [ "Before", "After 30m", "After 24h" ]],
    ["20% ETOH Weights", [ "Before", "After 30m", "After 24h" ]]
  ],
  subSessionLabelsMid: [
    "Cage",
    ["H20 Weights", [ "Before", "After 24h" ]],
    ["20% ETOH Weights", [ "Before", "After 24h" ]]
  ],
  subSessionLabelsEnd: [
    "Cage",
    ["H20 Weights", [ "After 24h" ]],
    ["20% ETOH Weights", [ "After 24h" ]]
    ],
  cages: [
    {
      cageWeight: 259,
      cageLabel: "Cage 1 (Dummy)",
      sessions: [
        {
          "H20 Weights Begore": 432,
          "H20 Weights After 30m": 430,
          ...,
          "20% ETOH Weights After 24h": 340
        }
      ]
    }
  ]
}
```

### The CSV we need to Parse

```csv
Weights,Cage,H2O Weights,,,20% ETOH Weights,,\n
,,Before,After 30m,After 24h,Before,After 30m,After 24h\n
259,1,432,430,413,358,355,340\n
292,2,428,425,390,359,356,346\n
```

* Notice the 3 commas following __H2O Weights__ and the 2 commas + 1 newline following__ETOH Weights__. This is because these labels each take up __3__ cells.
* Notice how the second line is offset by 2 commas. This is because the first cells in the row above, __Weights__ and __Cage__ contain no values for the second row.
