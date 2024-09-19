using DAL.DO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.API
{
    public interface IDalAPI
    {
        Task<ServiceResponse> AddAsync(DlDonation donation);
        Task<ServiceResponse> UpdateAsync(DlDonation donation);
        Task<ServiceResponse> DeleteAsync(int id);
        Task<List<DlDonation>> GetAsync();
        Task<DlDonation> GetByIdAsync(int id);
    }
}
