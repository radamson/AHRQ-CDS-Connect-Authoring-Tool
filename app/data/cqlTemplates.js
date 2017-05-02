module.exports = {
   AgeRange : `define \$\{this.element_name\}:
              AgeInYears()>=\$\{this.min_age\} and AgeInYears()<=\$\{this.max_age\}\n`,
   MostRecentObservation: `define \${this.element_name\}:
              Last (
                [Observation: "\${this.observation.name\}"] O
                  where O.status.value = 'final'
                  and (
                    O.valueQuantity.unit.value in {\$\{this.observation.units.values\}}
                    or O.valueQuantity.code.value = \$\{this.observation.units.code\}
                  )
                  sort by O.issued
              )\n`
}