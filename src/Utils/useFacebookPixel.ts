import ReactPixel from 'react-facebook-pixel'

const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: true // enable logs
}

const useFacebookPixel = () => {
  ReactPixel.init('433105911164568', undefined, options)
  ReactPixel.pageView() // For tracking page view
  ReactPixel.track('ViewContent') // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
}

export default useFacebookPixel
