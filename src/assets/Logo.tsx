import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg'
export const Logo = () => {
    return (
        <Svg width="60" height="60" viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#6E8AFC" />
              <Stop offset="100%" stopColor="#375DFB" />
            </LinearGradient>
          </Defs>
          <Path
            d="M20,30 Q20,15 35,15 H65 Q80,15 80,30 Q80,60 50,85 Q20,60 20,30 Z"
            fill="url(#shieldGrad)"
          />
          <Path
            d="M50,35 Q55,50 70,50 Q55,50 50,65 Q45,50 30,50 Q45,50 50,35 Z"
            fill="white"
            fillOpacity="0.9"
          />
          <Path
            d="M50,35 Q55,50 70,50 Q55,50 50,65 Q45,50 30,50 Q45,50 50,35 Z"
            fill="url(#shieldGrad)"
            fillOpacity="0.5"
          />
        </Svg>
    )
}
