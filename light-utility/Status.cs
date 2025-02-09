using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace light_utility
{
    public class Status
    {
        public enum StatusType
        {
            Unknown = 0,
            Connected = 1,
            Offline = 2,
            Off = 3,
            On = 4,
            Running = 5,
            Error = 6
        }

        public StatusType Type { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
