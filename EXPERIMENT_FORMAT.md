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
