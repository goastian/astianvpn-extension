const { test, expect } = require('./fixtures')
const {
  login,
  waitForInstallPage,
  getGeolocation,
  checkIP,
  toggleProxyAndCheckIP,
} = require('./helpers')

test.describe('VPN Browser Extension - Free Account Features', () => {
  test.beforeEach(async ({ page, context, extensionId }) => {
    await page.waitForTimeout(500)
    const installPage = await waitForInstallPage(context)
    await installPage.close()
    await page.goto(`chrome-extension://${extensionId}/popup.html`)
  })

  test('should successfully toggle proxy and verify IP change', async ({
    page,
  }) => {
    await toggleProxyAndCheckIP(page) //toggle on
    await toggleProxyAndCheckIP(page, 'Disconnected') //toggle off
  })

  test('should switch between different free VPN locations', async ({
    page,
  }) => {
    const initialIP = await toggleProxyAndCheckIP(page)

    await page.locator('#locationsPageButton').click()
    await expect(page.locator('text=Locations')).toBeVisible()

    await page.locator('#de').click()
    await expect(page.locator('text=Connected')).toBeVisible()

    const newIP = await checkIP(page)

    expect(newIP).not.toBe(
      initialIP,
      `IP should change when connecting to Germany`
    )
  })

  test('should enable and verify geolocation spoofing', async ({ page }) => {
    await page.goto('https://1vpn.org')
    const initialGeolocation = await getGeolocation(page)
    console.log('Initial geolocation:', initialGeolocation)

    await page.goBack()
    await toggleProxyAndCheckIP(page)

    await page.locator('#optionsPageButton').click()
    await page.locator('#spoofGeolocationToggle').click()

    await page.goto('https://1vpn.org')
    const newGeolocation = await getGeolocation(page)

    expect(newGeolocation).not.toEqual(
      initialGeolocation,
      'Geolocation should change after enabling spoofing'
    )
  })

  test('should disable WebRTC and prevent IP leaks', async ({ page }) => {
    await page.locator('#optionsPageButton').click()
    await page.locator('#disableWebRtcToggle').click()

    await page.goto('https://1vpn.org')

    const isWebRTCDisabled = await page.evaluate(() => {
      return new Promise((resolve) => {
        const pc = new (window.RTCPeerConnection ||
          window.mozRTCPeerConnection ||
          window.webkitRTCPeerConnection)({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        })

        let isDisabled = true
        pc.createDataChannel('')

        pc.createOffer()
          .then((sdp) => pc.setLocalDescription(sdp))
          .catch((err) => console.error('WebRTC offer failed:', err))

        pc.onicecandidate = (ice) => {
          if (ice?.candidate) isDisabled = false
        }

        setTimeout(() => {
          pc.close()
          resolve(isDisabled)
        }, 1000)
      })
    })

    expect(isWebRTCDisabled).toBe(true, 'WebRTC should be disabled')
  })

  test('should open signup page', async ({ page, context }) => {
    await page.locator('#optionsPageButton').click()

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('#signupButton').click(),
    ])

    await expect(newPage).toHaveURL('https://1vpn.org/signup/')
  })

  test('should open login page and login', async ({ page, context }) => {
    await login(page, context)

    const upgradeLink = page.locator('#upgradeLink')
    await expect(upgradeLink).not.toBeVisible({ timeout: 5000 })
  })

  test('should login and connect to premium servers', async ({
    page,
    context,
  }) => {
    await login(page, context)

    const initialIP = await checkIP(page)

    await page.locator('#locationsPageButton').click()
    await expect(page.locator('text=Locations')).toBeVisible()

    await page.locator('#jp').click()
    await expect(page.locator('text=Connected')).toBeVisible()

    const japanIP = await checkIP(page)

    expect(japanIP).not.toBe(
      initialIP,
      'IP should change when connecting to Japan'
    )
  })
})
