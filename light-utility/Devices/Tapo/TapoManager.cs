using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace light_utility.Devices.Tapo
{
    public class TapoManager
    {
        public static TapoDevices.TapoDeviceFactory? Factory { get; set; }

        public static List<TapoDevice> Devices { get; set; } = new List<TapoDevice>();

        public static void Initilise(string username, string password)
        {
            Factory = new TapoDevices.TapoDeviceFactory(username, password);

            string jsonContent = File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "/Config/Devices.json");
            List<TapoDevice>? devices = JsonConvert.DeserializeObject<List<TapoDevice>>(jsonContent);
            if(devices != null)
            {
                Devices = devices;
            }

        }

        public static TapoDevice? GetDevice(int id)
        {
            return Devices.Find(x => x.Id == id);
        }

        public static List<TapoDevice> GetDevices(List<int> ids)
        {
            return Devices.FindAll(x => ids.Contains(x.Id));
        }

        public class TapoDevice
        {
            public int Id { get; set; }
            public string Ip { get; set; }
            public Dictionary<string, string> Tags { get; set; } // Assuming Tags is a dictionary
            public string Location { get; set; }
            public string Name { get; set; }
        }
    }
}
