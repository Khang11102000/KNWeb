import { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#2f65b9',
    fontFamily: '__Plus_Jakarta_Sans_5e5f79'
  },
  components: {
    Typography: {
      titleMarginBottom: 0
    },
    Form: {
      labelColor: '#7e8b9a',
      labelFontSize: 12
    },
    Input: {
      borderRadiusLG: 4
    },
    Button: {
      borderRadius: 4
    }
  }
}

export default theme
