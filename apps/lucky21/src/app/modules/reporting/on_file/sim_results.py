from datetime import datetime
import json
import os

from modules.simulator.class_SimData import SimData


def recordSimResults(simData: SimData):

    # Record simulation results
    # Set up "sim_results" folder if there is not
    current_directory = os.getcwd()
    simResultsFolderLocation = os.path.join(current_directory, r'sim_results')
    if not os.path.exists(simResultsFolderLocation):
        os.makedirs(simResultsFolderLocation)

    # Create folder for new simulation
    now = datetime.now()
    timeStamp = now.strftime("%m/%d/%Y, %H:%M:%S")
    newSimFolderName = timeStamp.replace(
        ' ', '_').replace('/', '_').replace(',', '')
    newSmResultsFolderLocation = os.path.join(
        simResultsFolderLocation, newSimFolderName)
    if not os.path.exists(newSmResultsFolderLocation):
        os.makedirs(newSmResultsFolderLocation)

    # newFilePath = f'{simResultsFolderLocation}/{newSimFolderName}.json'

    # simData_JSON = simData.toCompressedJSON()

    # with open(newFilePath, 'w+') as f:
    #     # json.dump(simData_JSON, f, indent=4)
    #     json.dump(simData_JSON, f)
