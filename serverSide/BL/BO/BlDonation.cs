namespace BL.BO
{
    public record BlDonation
    (
         String NameEntity,
         int DonationAmount,
         String TypeEntity,
         String ConditionsDo,
         String? Destination,
         String Currency,
         float ConversionRate
    )
    {
        public BlDonation() : this( null, 0, null, null, null, null, 0) { }

    }
}
