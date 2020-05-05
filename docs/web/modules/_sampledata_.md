[web](../README.md) › [Globals](../globals.md) › ["sampleData"](_sampledata_.md)

# External module: "sampleData"

## Index

### Variables

* [sampleCageDisplayOrders](_sampledata_.md#const-samplecagedisplayorders)
* [sampleExperimentDisplayNames](_sampledata_.md#const-sampleexperimentdisplaynames)
* [sampleExperimentDisplayOrder](_sampledata_.md#const-sampleexperimentdisplayorder)
* [sampleExperimentMetadata](_sampledata_.md#const-sampleexperimentmetadata)
* [sampleExperiments](_sampledata_.md#const-sampleexperiments)
* [sampleRackDisplayOrder](_sampledata_.md#const-samplerackdisplayorder)

## Variables

### `Const` sampleCageDisplayOrders

• **sampleCageDisplayOrders**: *[Map](../interfaces/_types_.routemap.md#map)‹number, [List](../interfaces/_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹number››* = Map<RackId, List<CageId>>()
  .withMutations((map) => map
    .set(1, List.of(1, 2))
    .set(2, List.of(3, 4)))

Defined in packages/web/src/sampleData.ts:199

___

### `Const` sampleExperimentDisplayNames

• **sampleExperimentDisplayNames**: *[Map](../interfaces/_types_.routemap.md#map)‹string, string›* = Map<ExperimentId, DisplayName>()
  .set('experiment-1', 'Experiment 1')
  .set('experiment-2', 'Experiment 2')

Defined in packages/web/src/sampleData.ts:193

___

### `Const` sampleExperimentDisplayOrder

• **sampleExperimentDisplayOrder**: *[List](../interfaces/_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹string›* = List.of('experiment-1', 'experiment-2')

Defined in packages/web/src/sampleData.ts:197

___

### `Const` sampleExperimentMetadata

• **sampleExperimentMetadata**: *[Map](../interfaces/_types_.routemap.md#map)‹string, [ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md)‹››* = Map<ExperimentId, ExperimentMetaData>()
  .withMutations((experimentMap) => experimentMap
    .set('experiment-1', {
      experimentName: 'Experiment 1',
      experimentLeadName: 'Dr. Quinn',
      startDate: dayjs('2020-01-01'),
      lastUpdated: dayjs('2020-02-04'),
      sessionCount: 20,
      bottlesPerCage: 2,
      treatments: ['h2o', 'EtOH'],
    })
    .set('experiment-2', {
      experimentName: 'Experiment 2',
      experimentLeadName: 'Prof. Stahr',
      startDate: dayjs('2020-01-07'),
      lastUpdated: dayjs('2020-01-08'),
      sessionCount: 20,
      bottlesPerCage: 2,
      treatments: ['h2o', 'EtOH'],
    }))

Defined in packages/web/src/sampleData.ts:26

___

### `Const` sampleExperiments

• **sampleExperiments**: *[Map](../interfaces/_types_.routemap.md#map)‹string, [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)‹››* = Map<ExperimentId, ExperimentData>()
  .withMutations((experimentMap) => experimentMap
    .set('experiment-1', Map<RackId, Map<CageId, CageData>>().withMutations((map) => map
      .set(1, Map<CageId, CageData>().withMutations((rackData) => rackData
        .set(1, List().withMutations((cageData) => cageData
          .push({
            sessionNumber: 1,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 5)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 3)
                  .set('EtOH', 9)),
              },
            ),
          })
          .push({
            sessionNumber: 2,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 5)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 2)
                  .set('EtOH', 8)),
              },
            ),
          })))
        .set(2, List().withMutations((cageData) => cageData
          .push({
            sessionNumber: 1,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 10)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 9)
                  .set('EtOH', 9)),
              },
            ),
          })
          .push({
            sessionNumber: 2,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 10)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 1)
                  .set('EtOH', 4)),
              },
            ),
          })))))
      .set(2, Map<CageId, CageData>().withMutations((rackData) => rackData
        .set(3, List().withMutations((cageData) => cageData
          .push({
            sessionNumber: 1,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 5)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 3)
                  .set('EtOH', 9)),
              },
            ),
          })
          .push({
            sessionNumber: 2,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 5)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 2)
                  .set('EtOH', 8)),
              },
            ),
          })))
        .set(4, List().withMutations((cageData) => cageData
          .push({
            sessionNumber: 1,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 10)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 9)
                  .set('EtOH', 9)),
              },
            ),
          })
          .push({
            sessionNumber: 2,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 10)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 1)
                  .set('EtOH', 4)),
              },
            ),
          }))))))))

Defined in packages/web/src/sampleData.ts:47

___

### `Const` sampleRackDisplayOrder

• **sampleRackDisplayOrder**: *[List](../interfaces/_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹number›* = List.of(1, 2)

Defined in packages/web/src/sampleData.ts:204
