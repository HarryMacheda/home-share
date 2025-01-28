using light_utility.Device;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace light_utility.Devices.Tapo
{
    public class L530 : ILight
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public Status Status { get; set; }
        public Colour Colour { get; set; }
        private TapoDevices.TapoBulb Bulb { get; set; }
        public L530(string ip)
        {
            Bulb = TapoManager.Factory.CreateBulb(ip);
            Status = new Status() { Type = Status.StatusType.Connected };
        }

        public async Task<Status> Connect()
        {
            try
            {
                await Bulb.ConnectAsync();
            }
            catch
            {
                Status.Type = Status.StatusType.Offline;
            }
            return Status;

        }

        public async Task<Status> GetInfo()
        {
            var bulbInfo = await Bulb.GetInfoAsync();
            Name = bulbInfo.Nickname;
            Location = bulbInfo.Region;
            return Status;
        }
        public async Task<Status> GetStatus()
        {
            var bulbInfo = await Bulb.GetInfoAsync();
            if (bulbInfo == null)
            {
                Status.Type = Status.StatusType.Unknown;
                return Status;
            }
            Status.Type = bulbInfo.DeviceOn ? Status.StatusType.On : Status.StatusType.Off;
            await GetColour();
            return Status;
        }

        public async Task<Status> On()
        {
            await Bulb.TurnOnAsync();
            return Status;
        }

        public async Task<Status> Off()
        {
            await Bulb.TurnOffAsync();
            return Status;
        }

        public async Task<Status> SetColour(Colour colour)
        {
            var (hue, saturation, brightness) = colour.Hsb;
            await Bulb.SetColorAsync(hue, saturation);
            await Bulb.SetBrightnessAsync(brightness);
            await GetColour();
            return Status;
        }

        private async Task<Colour> GetColour()
        {
            var bulbInfo = await Bulb.GetInfoAsync();

            Colour =  Colour.FromHSB(bulbInfo.Hue, bulbInfo.Saturation, bulbInfo.Brightness);
            return Colour;
        }
    }
}
