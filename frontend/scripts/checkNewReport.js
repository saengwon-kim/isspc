const fetch = require('isomorphic-unfetch')
const Papa = require('papaparse')
const { WebClient } = require('@slack/web-api')

const fetchCSV = async () => {
  const CSV_URL = 'to-be-filled'
  const response = await fetch(CSV_URL)
  const text = await response.text()
  return Papa.parse(text).data
}

const buildMessage = reports => {
  const SHEET_URL = 'to-be-filled'
  return `확인 안 한 신고가 있어요.\n<${SHEET_URL}|[신고 확인하기]>`
}

const main = async () => {
  const data = await fetchCSV()
  // 6번 컬럼이 '확인'
  const newReports = data.slice(1).filter(row => !row[6] || row[6] !== 'O')

  if (newReports.length < 1) {
    return
  }

  const msg = buildMessage(newReports)
  const slack = new WebClient(process.env.SLACK_TOKEN)
  const channelId = 'to-be-filled'

  await slack.chat.postMessage({
    channel: channelId,
    text: msg
  })
}

main()
