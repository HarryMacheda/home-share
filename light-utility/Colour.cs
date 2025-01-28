using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace light_utility
{
    public class Colour
    {
        public int Red { get; set; }
        public int Green { get; set; }
        public int Blue { get; set; }

        public Colour(int red, int green, int blue)
        {
            ValidateColorValue(red);
            ValidateColorValue(green);
            ValidateColorValue(blue);

            Red = red;
            Green = green;
            Blue = blue;
        }

        public Colour(string hex)
        {
            if (string.IsNullOrWhiteSpace(hex))
                throw new ArgumentException("Hex string cannot be null or empty.");

            if (hex.StartsWith("#"))
                hex = hex.Substring(1);

            if (hex.Length != 6)
                throw new ArgumentException("Hex string must be 6 characters long.");

            Red = int.Parse(hex.Substring(0, 2), NumberStyles.HexNumber);
            Green = int.Parse(hex.Substring(2, 2), NumberStyles.HexNumber);
            Blue = int.Parse(hex.Substring(4, 2), NumberStyles.HexNumber);
        }

        public static Colour FromHSB(int hue, int saturation, int brightness)
        {

            float s = saturation / 100f;
            float v = brightness / 100f;
            float c = v * s;
            float x = c * (1 - Math.Abs((hue / 60f) % 2 - 1));
            float m = v - c;

            float r = 0, g = 0, b = 0;

            if (hue >= 0 && hue < 60)
            {
                r = c;
                g = x;
                b = 0;
            }
            else if (hue >= 60 && hue < 120)
            {
                r = x;
                g = c;
                b = 0;
            }
            else if (hue >= 120 && hue < 180)
            {
                r = 0;
                g = c;
                b = x;
            }
            else if (hue >= 180 && hue < 240)
            {
                r = 0;
                g = x;
                b = c;
            }
            else if (hue >= 240 && hue < 300)
            {
                r = x;
                g = 0;
                b = c;
            }
            else if (hue >= 300 && hue < 360)
            {
                r = c;
                g = 0;
                b = x;
            }

            return new Colour((int)((r + m) * 255), (int)((g + m) * 255), (int)((b + m) * 255));
        }
        public (int Red, int Green, int Blue) Rgb
        {
            get { return (Red, Green, Blue); }
        }

        public string Hex
        {
            get { return $"#{Red:X2}{Green:X2}{Blue:X2}"; }
        }

        public (int Hue, int Saturation, int Brightness) Hsb
        {
            get
            {
                float r = Red / 255f;
                float g = Green / 255f;
                float b = Blue / 255f;

                float max = Math.Max(r, Math.Max(g, b));
                float min = Math.Min(r, Math.Min(g, b));
                float delta = max - min;

                int hue = 0;
                if (delta > 0)
                {
                    if (max == r)
                        hue = (int)((g - b) / delta * 60);
                    else if (max == g)
                        hue = (int)((2 + (b - r) / delta) * 60);
                    else
                        hue = (int)((4 + (r - g) / delta) * 60);

                    if (hue < 0)
                        hue += 360;
                }

                int saturation = max == 0 ? 0 : (int)((delta / max) * 100);
                int brightness = (int)(max * 100);

                return (hue, saturation, brightness);
            }
        }

        private void ValidateColorValue(int value)
        {
            if (value < 0 || value > 255)
                throw new ArgumentOutOfRangeException(nameof(value), "Color value must be between 0 and 255.");
        }

        public static List<Colour> GenerateGradient(List<Colour> colors, int numColors)
        {
            if (colors == null || colors.Count < 2)
                throw new ArgumentException("At least two colors are required to generate a gradient.");

            if (numColors < 2)
                throw new ArgumentException("The number of colors in the gradient must be at least 2.");

            List<Colour> gradient = new List<Colour>();

            // Calculate how many colors to interpolate between each pair of adjacent colors
            int segmentCount = numColors - 1;
            int colorsPerSegment = segmentCount / (colors.Count - 1);

            // Add the first color to the gradient
            gradient.Add(colors[0]);

            // Iterate through the colors list to create the gradient
            for (int i = 0; i < colors.Count ; i++)
            {
                Colour startColor = colors[i];
                Colour endColor = colors[(i + 1) % colors.Count];

                for (int j = 1; j <= colorsPerSegment; j++)
                {
                    float t = j / (float)(colorsPerSegment + 1); 
                    int red = (int)(startColor.Red + t * (endColor.Red - startColor.Red));
                    int green = (int)(startColor.Green + t * (endColor.Green - startColor.Green));
                    int blue = (int)(startColor.Blue + t * (endColor.Blue - startColor.Blue));

                    gradient.Add(new Colour(red, green, blue));
                }
            }
            return gradient;
        }
    }
}
