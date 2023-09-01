from modules.reporting.on_screen.module_reports_template_list import ReportsConfig
from modules.simulator.simulator import SimulatorParameters, runSimulator

# Simulation parameters
simulatorParameters = SimulatorParameters(
    simulationYears=10,
    startingCapital=100000,
    requiredRateOfReturn=.11,
    reportsConfig=ReportsConfig(
        daily=False,
        monthly=True,
        annual=True,
        lifetime=True,
        summaries=False,
        lists=False,
    )
)

runSimulator(simulatorParameters)
