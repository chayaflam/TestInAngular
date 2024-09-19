using BL.BO;
using DAL.DO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.API
{
    public interface IBlAPI
    {
        Task<ServiceResponse> Add(BlDonation donation);
        Task<ServiceResponse> Update(BlDonation donation);
        Task<ServiceResponse> Delete(int id);
        Task<List<BlDonation>> Get();
        Task<BlDonation> GetById(int id);
    }
}
