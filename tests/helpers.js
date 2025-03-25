const { expect } = require('./fixtures')
require('dotenv').config()

async function login(
  page,
  context,
  username = process.env.PREMIUM_USERNAME,
  password = process.env.PREMIUM_PASSWORD
) {
  await page.locator('#optionsPageButton').click()

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#loginButton').click(),
  ])

  await expect(newPage).toHaveURL('https://1vpn.org/login/')

  await newPage.fill('input[name="username"]', username)
  await newPage.fill('input[name="password"]', password)

  await Promise.all([
    newPage.waitForNavigation(),
    newPage.click('button[type="submit"]'),
  ])

  await expect(newPage).toHaveURL('https://1vpn.org/account/')

  // Close the login page and return to popup
  await newPage.close()
  await page.bringToFront()

  await page.reload()
}

async function waitForInstallPage(context, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const pages = context.pages()
    const installPage = pages.find((p) => p.url().includes('install.html'))
    if (installPage) return installPage
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error('Install page not found within timeout')
}

async function getGeolocation(page) {
  return page.evaluate(() => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (error) => reject(error)
      )
    })
  })
}

async function checkIP(page) {
  return page.evaluate(async () => {
    const response = await fetch('https://1vpn.org/ip_lookup/')
    const data = await response.json()
    return data.ip
  })
}

async function toggleProxyAndCheckIP(page, expectedStatus = 'Connected') {
  const initialIP = await checkIP(page)

  const proxyToggle = page.locator('#proxyToggle')
  await proxyToggle.click()

  await expect(page.locator(`text=${expectedStatus}`)).toBeVisible()

  const newIP = await checkIP(page)
  expect(newIP).not.toBe(
    initialIP,
    'IP address should change after toggling proxy'
  )

  return newIP
}

module.exports = {
  login,
  waitForInstallPage,
  getGeolocation,
  checkIP,
  toggleProxyAndCheckIP,
}
