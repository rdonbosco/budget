module.exports = {
    testConcurrency: 1,
    apiKey: 'PN2bUxy5ySySqJkF90MtUi8X95UD45G0oB1016DvKdiqw110',
    //
    browser: [
        // Add browsers with different viewports
        {width: 800, height: 600, name: 'chrome'},
        {width: 700, height: 500, name: 'firefox'},
        {width: 1600, height: 1200, name: 'ie11'},
        {width: 1024, height: 768, name: 'edgechromium'},
        {width: 800, height: 600, name: 'safari'},
        // Add mobile emulation devices in Portrait mode
        {deviceName: 'iPhone X', screenOrientation: 'portrait'},
        {deviceName: 'Pixel 2', screenOrientation: 'portrait'}
    ],
    // set batch name to the configuration
    batchName: 'Budget-app Batch'
}