using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace light_utility.Device
{
    public enum DeviceBrand
    {
        Tapo
    }

    public enum TapoDeviceType { 
        L530
    }
    public interface ILight
    {
        public Status Status { get; set; }
        public Colour Colour { get; set; }
        public Task<Status> On();
        public Task<Status> Off();
        public Task<Status> SetColour(Colour colour);
        public string Name { get; set; }
        public string Location { get; set; }
    }
}
