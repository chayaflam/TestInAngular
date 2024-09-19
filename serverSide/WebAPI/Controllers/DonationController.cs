
using BL.API;
using BL.BO;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("[controller]")]

    [ApiController]
    public class DonationController : ControllerBase
    {
        private readonly IBlAPI _bl;
        public DonationController(IBlAPI _blImp)
        {
            this._bl = _blImp;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _bl.Get();
            return Ok(data);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var data = await _bl.GetById(id);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult>Add([FromBody]BlDonation addDonation)
        {
            var result = await _bl.Add(addDonation);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult>Update([FromBody] BlDonation updateDonation)
        {
            var result = await _bl.Update(updateDonation);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _bl.Delete(id);
            return Ok(result);
        }
    }
}
