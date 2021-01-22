import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'
// return `${pageTitle} - ${title}`
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title}`
  }
  return `${title}`
}
