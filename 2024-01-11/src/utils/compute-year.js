import { unref } from 'vue'
export const compute_total_years = (remaining, annual_expenditure, rate_percent) => {
  let local_years = 0

  const inner_compute_total_years = (remaining, annual_expenditure) => {
    const local_remainning = unref(remaining);
    const local_annual_expenditure = unref(annual_expenditure)
    if (local_remainning > 0 && local_years <= 100) {
      const temp_remaining = local_remainning * (1 + unref(rate_percent)) - local_annual_expenditure
      local_years += 1
      return { temp_remaining, local_annual_expenditure }
    } else {
      return null
    }
  }

  let result = {temp_remaining: remaining, local_annual_expenditure: annual_expenditure}
  while (result) {
    let { temp_remaining, local_annual_expenditure } = result
    result = inner_compute_total_years(temp_remaining, local_annual_expenditure)
  }
  return local_years
}
