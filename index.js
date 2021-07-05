import chalk from 'chalk'
import { inspect } from 'util'

// prettier-ignore
const COLORS = [
  20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
  69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
  135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
  172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
  205, 206, 207, 208, 209, 214, 215, 220, 221
]

const FATAL = 60
const ERROR = 50
const WARN = 40
const INFO = 30
const DEBUG = 20
const TRACE = 10

const TIMESTAMP_LEN = 10
const start_time = Date.now()
function format_time(time) {
  return chalk.dim(
    (time - start_time)
      .toString()
      .padStart(TIMESTAMP_LEN, '0')
      .slice(0, TIMESTAMP_LEN)
  )
}

function string_hash(str) {
  return str
    .split('')
    .reduce((hash, c) => ((hash << 5) - hash + c.charCodeAt(0)) | 0, 0)
}

const NAME_LEN = 16
function format_name(name = '') {
  const hash = string_hash(name)

  return chalk
    .ansi256(COLORS[Math.abs(hash) % COLORS.length])
    .bold(name.padStart(NAME_LEN, ' ').slice(0, NAME_LEN))
}

const LEVEL_LEN = 3
function format_level(level) {
  const tags = {
    [FATAL]: chalk.bgRedBright.white(' F '),
    [ERROR]: chalk.bgRedBright.black(' E '),
    [WARN]: chalk.bgYellowBright.black(' W '),
    [INFO]: chalk.bgGray.greenBright.bold(' I '),
    [DEBUG]: chalk.bgGray.blueBright.bold(' D '),
    [TRACE]: chalk.bgGray.white(' T '),
  }

  return tags[level] || ' U '
}

const LINE_SPACER = ' '.repeat(TIMESTAMP_LEN + 1 + NAME_LEN + LEVEL_LEN)
function format_msg(msg = '', level) {
  const colors = {
    [FATAL]: chalk.bold.redBright,
    [ERROR]: chalk.bold.redBright,
    [WARN]: chalk.bold.yellowBright,
    [INFO]: chalk,
    [DEBUG]: chalk.dim,
    [TRACE]: chalk.dim,
  }

  const [first, ...next] = msg.split('\n')
  const color = colors[level] || chalk

  return color(first) + next.map((line) => `\n${LINE_SPACER}${color(line)}`)
}

export default function pretty(data) {
  const { time, level, name, msg, ...rest } = JSON.parse(data)

  return `${format_time(time)} ${format_name(name)} ${format_level(
    level
  )} ${format_msg(msg, level)} ${inspect(rest, false, 2, true)}\n`
}
