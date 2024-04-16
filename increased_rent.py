import numpy as np
import pandas as pd

annual_escalation = 0.03
annual_escalations = []
base_rent = 3.45
sqft_leased = 2_794
term = 65

months_free_rent = 5
current_rate = 1

rates = []
# calculate the rent
for period in range(term):
    if period > 11 and period % 12 == 0:
        current_rate = current_rate * (1 + annual_escalation)
    # if months_free_rent > period:
    #     rent_abatements.append(current_rate)
    rates.append(current_rate)


rates = np.array(rates)
monthly_payments = np.multiply(np.full(term, base_rent * sqft_leased), rates)

# calculate the rent abatements
rent_abatements = [0] * term
for period, monthly_payment in enumerate(monthly_payments):
    if months_free_rent > period:
        rent_abatements[period] = -monthly_payment

# calculate the rent abatements and commisions
commissions = [0] * term
commission_pct = 0.04
for period, abatement in enumerate(rent_abatements):
    if abatement >= 0:
        commission = commission_pct * monthly_payments[period]
        commissions[period] = commission

df = pd.DataFrame(
    data={
        "Rate": rates,
        "Monthly Payment": monthly_payments,
        "Rent Abatement": rent_abatements,
        "Commission": commissions,
    }
)

print(df)
