from enum import Enum
import math


class Alignment(Enum):
    START = 0
    CENTRE = 1
    END = 2


class ColumnDataType(Enum):
    GENERAL = 0
    INT = 1
    DECI2 = 2
    PERC2 = 3


class ReportPeriod(Enum):
    DAY = 'Day'
    MONTH = 'Month'
    YEAR = 'Year'
    LIFETIME = 'Lifetime'


class ReportsConfig:
    daily: bool
    monthly: bool
    annual: bool
    lifetime: bool
    summaries: bool
    lists: bool

    def __init__(self, daily: bool, monthly: bool, annual: bool, lifetime: bool, summaries: bool, lists: bool):
        self.daily = daily
        self.monthly = monthly
        self.annual = annual
        self.lifetime = lifetime
        self.summaries = summaries
        self.lists = lists


class ListReport:
    title: str
    headers: list
    lines: list

    def __init__(self, title, headers, lines):
        self.title = title
        self.headers = headers
        self.lines = lines


class ReportHeader:
    content: str
    width: int
    alignment: Alignment
    columnDataType: ColumnDataType

    def __init__(self, content: str, width: int, alignment: Alignment = 0, columnDataType: ColumnDataType = 0):
        self.content = content
        self.width = width
        self.alignment = alignment
        self.columnDataType = columnDataType


def printListReport(report: ListReport, incDayCount: bool):
    printReportTitle(report)
    printHeaders(report)
    printReportLinesByDay(report, incDayCount)
    printReportFooter(report)


def printReportTitle(report: ListReport):
    lineLength = 0
    header: ReportHeader
    for header in report.headers:
        lineLength += header.width + 2

    title = report.title
    fillersRequired = lineLength - len(title)

    isOddFillers = math.modf(fillersRequired/2)[0] > 0

    title = '-' * math.floor(fillersRequired / 2) + \
        title + '-' * (math.floor(fillersRequired / 2) - 1)
    if isOddFillers:
        title += '|'
    title = title[: -1] + '|'

    print('|-' + title)


def printHeaders(report: ListReport):
    structuredHeaders = setStructureHeader(report.headers)

    structuredHeader: list
    remainingContent = True
    while remainingContent:
        lineContent = ''
        remainingContent = False
        colIndex = 0
        for structuredHeader in structuredHeaders:
            if (len(structuredHeader) > 0):
                lineContent += structuredHeader[0] + '| '
                structuredHeader.pop(0)
                remainingContent = True
            else:
                colParameters: ReportHeader = report.headers[colIndex]
                lineContent += f'{" " * colParameters.width}| '
            colIndex += 1

        if (len(lineContent.replace('|', ' ').strip(' ')) > 0):
            print('| ' + lineContent)
        else:
            print('|-' + lineContent.replace(' ', '-')[: -1])


def setStructureHeader(headers):
    structuredHeaders = []
    header: ReportHeader
    for header in headers:
        # If the content length is less then the col width then
        # add the content as the only line and move on to next header
        if len(header.content) <= header.width:
            structuredHeaders.append(
                [f'{header.content}{" " * ( header.width - len(header.content) )}'])
            continue

        else:
            headerLines = []
            currentLineContent = ''
            splitHeader = header.content.split(" ", 1)
            # While more header content remains
            while (len(splitHeader) > 0):
                # If the next word is longer then the col width - split that word
                if (len(splitHeader[0]) > header.width):
                    headerLines.append(
                        splitHeader[0][:header.width - 2] + '- ')
                    splitHeader[0] = splitHeader[0][header.width - 2:]
                # Else add the word to the current line with a space
                # Remove that word from the list of words still to process
                else:
                    currentLineContent += splitHeader[0] + ' '
                    splitHeader.pop(0)
                    # If the current line plus the next word (if there is) exceed the col width
                    # then add the line to the headerLines and reset the content
                    if (len(splitHeader) > 0):
                        if (len(currentLineContent) + len(splitHeader[0]) > header.width):
                            headerLines.append(
                                f'{currentLineContent}{" " * ( header.width - len(currentLineContent) )}')
                            currentLineContent = ''
                    else:
                        headerLines.append(
                            f'{currentLineContent}{" " * ( header.width - len(currentLineContent) )}')

        # After all the words have been processed - add it to the structuredHeaders
        structuredHeaders.append(headerLines)

    return structuredHeaders


def printReportLinesByDay(report: ListReport, incDayCount: bool):
    dayCounter = 1
    line: list
    for line in report.lines:
        if incDayCount:
            line.insert(0, str(dayCounter))
        printReportLine(report.headers, line)
        dayCounter += 1


def printReportLine(headers, reportLine):
    lineToPrint = ''
    colCounter = 0
    for col in reportLine:
        header: ReportHeader = headers[colCounter]
        cellContent = ''
        valueContent = ''
        if col == None:
            valueContent = str('')
        else:
            if (header.columnDataType == ColumnDataType.GENERAL):
                valueContent = str(col)
            if (header.columnDataType == ColumnDataType.DECI2):
                valueContent = str("{:,.2f}".format(col))
            if (header.columnDataType == ColumnDataType.INT):
                valueContent = str("{:,.0f}".format(col))
            if (header.columnDataType == ColumnDataType.PERC2):
                valueContent = str("{:,.2f}".format(col)) + '%'

        contentLen = len(valueContent)
        isEvenContent = math.floor(contentLen / 2) == math.ceil(contentLen / 2)
        if (header.alignment == Alignment.START):
            cellContent = f'{valueContent}{" " * (header.width - contentLen)}'
        if (header.alignment == Alignment.END):
            cellContent = f'{" " * (header.width - contentLen)}{valueContent}'
        if (header.alignment == Alignment.CENTRE):
            cellContent = f'{" " * (math.floor((header.width - contentLen) / 2))}{valueContent}{" " * (math.floor((header.width - contentLen) / 2))}'
            if not isEvenContent:
                cellContent = cellContent + ' '

        lineToPrint = lineToPrint + cellContent
        lineToPrint = lineToPrint + '| '

        colCounter += 1

    print('| ' + lineToPrint)


def printReportFooter(report: ListReport):
    lineLength = 0
    header: ReportHeader
    for header in report.headers:
        lineLength += header.width + 2

    title = ''
    fillersRequired = lineLength - len(title)

    isOddFillers = math.modf(fillersRequired/2)[0] > 0

    title = '_' * math.floor(fillersRequired / 2) + \
        title + '_' * (math.floor(fillersRequired / 2) - 1)
    if isOddFillers:
        title += '|'
    title = title[: -1] + '|'

    print('|_' + title)
    print()
