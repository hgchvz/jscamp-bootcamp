import { jobs, candidates } from './arrays'
import { filterByExperience, searchJobs } from './functions'
import { isQualified, formatSalary } from './narrowing'
import { getSalaryRange } from './tuples'
import { safeSearch, displaySearchResults } from './unions'
import { getJobSummaries } from './utilities'

console.log('=== Sistema de Gestión de Empleos ===\n')
console.log('Total de empleos:', jobs.length)

const searchResults = searchJobs(jobs, 'developer')
console.log('Empleos encontrados con "developer":', searchResults.length)

const seniorJobs = filterByExperience(jobs, 'senior')
console.log('Empleos senior:', seniorJobs.length)

if (jobs.length > 0 && candidates.length > 0) {
  const qualified = isQualified(candidates[0], jobs[0])
  console.log(`¿${candidates[0].name} está cualificado para ${jobs[0].title}?`, qualified)
}

const [minSalary, maxSalary] = getSalaryRange(jobs)
console.log(`Rango salarial: ${formatSalary(minSalary)} - ${formatSalary(maxSalary)}`)

const searchResult = safeSearch(jobs, 'react')
displaySearchResults(searchResult)

const summaries = getJobSummaries(jobs)
console.log('\nResúmenes de empleos:')
summaries.forEach((summary) => {
  console.log(`- ${summary.title} en ${summary.company} (${summary.location})`)
})

console.log('\nEjercicio completado!')