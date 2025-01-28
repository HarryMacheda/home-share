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
            Unknown,
            Connected,
            Offline,
            Off,
            On,
            Running,
            Error
        }

        public StatusType Type { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
