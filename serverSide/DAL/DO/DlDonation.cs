using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DO
{
    public record DlDonation
    (
         int Id ,
         String NameEntity ,
         int DonationAmount, 
         String TypeEntity ,
         String ConditionsDo ,
         String? Destination,
         String Currency,
         float ConversionRate
    )
    {
        public DlDonation() : this(0,null, 0, null, null, null, null, 0) { }

    }
}
