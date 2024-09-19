using DAL.Data;
using DAL.DO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.API
{
    public class API : IDalAPI
    {
        private readonly AppDbContext appDbContext;

        public API(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public async Task<ServiceResponse> AddAsync(DlDonation dlDonation)
        {
            Random random = new Random();
            int id=random.Next(100, 1000);
            DlDonation addDonation = new DlDonation 
            ( id ,
               dlDonation.NameEntity,
               dlDonation.DonationAmount,
               dlDonation.TypeEntity,
               dlDonation.ConditionsDo,
               dlDonation.Destination,
               dlDonation.Currency,
               dlDonation.ConversionRate
            );
            appDbContext.Donations.Add(addDonation);
            await SaveChangesAsync();
            return new ServiceResponse(true, "added");
        }

        public async Task<ServiceResponse> DeleteAsync(int id)
        {
            var donation = await appDbContext.Donations.FindAsync(id);
            if (donation == null)
                return new ServiceResponse(false, "donation not found");
            appDbContext.Donations.Remove(donation);
            await SaveChangesAsync();
            return new ServiceResponse(true, "deleted");
        }

        public async Task<List<DlDonation>> GetAsync() =>
          await appDbContext.Donations.ToListAsync();

        public async Task<DlDonation> GetByIdAsync(int id)
        {
            return await appDbContext.Donations.FindAsync(id);
        }

        public async Task<ServiceResponse> UpdateAsync(DlDonation donation)
        {
            appDbContext.Update(donation);
            await SaveChangesAsync();
            return new ServiceResponse(true, "update");
        }


        private async Task SaveChangesAsync() => await appDbContext.AddRangeAsync();

    }
}
