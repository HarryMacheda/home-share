using light_utility;
using light_utility.Devices.Tapo;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;
using static System.Reflection.Metadata.BlobBuilder;

namespace light_manager_api.Controllers.Lights
{
    [ApiController]
    [Route("api/lights")]
    public class LightController : Controller
    {
        [HttpPost("on")]
        public async Task<IActionResult> On(List<int> ids)
        {
            foreach(TapoManager.TapoDevice device in TapoManager.GetDevices(ids))
            {
                Task.Run(async () =>
                {
                    L530 bulb = new L530(device.Ip)
                    {
                        Id = device.Id
                    };
                    await bulb.Connect();
                    await bulb.On();
                });
            }

            return Ok(true);
        }
        [HttpPost("off")]

        public async Task<IActionResult> Off(List<int> ids)
        {
            foreach (TapoManager.TapoDevice device in TapoManager.GetDevices(ids))
            {
                Task.Run(async () =>
                {
                    L530 bulb = new L530(device.Ip)
                    {
                        Id = device.Id
                    };
                    await bulb.Connect();
                    await bulb.Off();
                });
            }

            return Ok(true);
        }

        public class setColourRequest
        {
            public List<int> Ids { get; set; }
            public string Hex { get; set; }
        }

        [HttpPost("setColour")]
        public async Task<IActionResult> SetColour([FromBody] setColourRequest request)
        {
            Colour colour = new Colour(request.Hex);
            List<L530> bulbs = new List<L530>();

            foreach (TapoManager.TapoDevice device in TapoManager.GetDevices(request.Ids))
            {
                L530 bulb = new L530(device.Ip)
                {
                    Id = device.Id
                };
                await bulb.Connect();
                bulbs.Add(bulb);
            }

            await Task.WhenAll(bulbs.Select(bulb => Task.Run(async () =>
            {
                await Task.Run(() => bulb.SetColour(colour));
            })));

            return Ok(true);
        }

        public class setColoursRequest
        {
            public List<int> Ids { get; set; }
            public List<string> Hex { get; set; }
        }

        [HttpPost("setColours")]
        public async Task<IActionResult> SetColours([FromBody] setColoursRequest request)
        {
            int Colours = 100;
            List<L530> bulbs = new List<L530>();

            foreach (TapoManager.TapoDevice device in TapoManager.GetDevices(request.Ids))
            {
                L530 bulb = new L530(device.Ip)
                {
                    Id = device.Id
                };
                await bulb.Connect();
                bulbs.Add(bulb);
            }

            while (true)
            {
                foreach(Colour colour in Colour.GenerateGradient(request.Hex.Select(colorString => new Colour(colorString)).ToList(), Colours))
                {

                    await Task.WhenAll(bulbs.Select(bulb => Task.Run(async () =>
                    {
                        await bulb.SetColour(colour);
                    })));
                }
            }

            return Ok(true);
        }

    }
}
