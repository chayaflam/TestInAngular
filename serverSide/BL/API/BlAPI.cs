using BL.API;
using BL.BO;
using DAL.API;
using DAL.DO;
using System.Text.RegularExpressions;
using MimeKit;
using MailKit.Security;
using MimeKit.Text;

namespace BL.Services
{
    public class BlAPI : IBlAPI
    {
        private IDalAPI _dal;
        public BlAPI(IDalAPI _dal)
        {
            this._dal = _dal;
        }
        public async Task<ServiceResponse> Add(BlDonation blDonation)
        {
           if(!CheckValues(blDonation)|| !CheckTestValues(blDonation))
            {
                return new ServiceResponse(false, "Invalid values");
            };

            if (blDonation.DonationAmount > 100000)
                sendEmail(blDonation);

            DlDonation dlDonation = new DlDonation
                (0,
                blDonation.NameEntity,
                blDonation.DonationAmount,
                blDonation.TypeEntity,
                blDonation.ConditionsDo,
                blDonation.Destination,
                blDonation.Currency,
                blDonation.ConversionRate);
           var result = await _dal.AddAsync(dlDonation);

            return result;
        }
        public async Task<ServiceResponse> Delete(int id)
        {
            var result =await _dal.DeleteAsync(id);
            return result;
        }

        public async Task<List<BlDonation>> Get()
        {
            var result = await _dal.GetAsync();
            List<BlDonation> bldonations = result.Select(d =>
              new BlDonation
              {
                  NameEntity = d.NameEntity,
                  DonationAmount = d.DonationAmount,
                  TypeEntity = d.TypeEntity,
                  ConditionsDo = d.ConditionsDo,
                  Destination = d.Destination,
                  Currency = d.Currency,
                  ConversionRate = d.ConversionRate
              }).ToList();

            return bldonations;
        }


        public async Task<BlDonation> GetById(int id)
        {
            DlDonation dlDonation = await _dal.GetByIdAsync(id);
            if (dlDonation == null) return null;

            BlDonation blDonation = new BlDonation
            {
                NameEntity = dlDonation.NameEntity,
                DonationAmount = dlDonation.DonationAmount,
                TypeEntity = dlDonation.TypeEntity,
                ConditionsDo = dlDonation.ConditionsDo,
                Destination = dlDonation.Destination,
                Currency = dlDonation.Currency,
                ConversionRate = dlDonation.ConversionRate
            };
            return blDonation;
        }

        public async Task<ServiceResponse> Update(BlDonation blDonation)
        {
            DlDonation dlDonation = new DlDonation
              (0,
              blDonation.NameEntity,
              blDonation.DonationAmount,
              blDonation.TypeEntity,
              blDonation.ConditionsDo,
              blDonation.Destination,
              blDonation.Currency,
              blDonation.ConversionRate);
            var result = await _dal.UpdateAsync(dlDonation);
            return result;
        }
        private bool CheckValues(BlDonation blDonation)
        {
            if (blDonation.NameEntity == "" || blDonation.DonationAmount == 0 ||
                blDonation.TypeEntity == null || blDonation.Destination == null
                || blDonation.Currency == null || blDonation.ConversionRate == 0)
            {
                return false;
            }
            else
                return true;

        }


        public bool CheckTestValues(BlDonation donation)
        {
            if (donation == null) return false;
            
            foreach (var property in donation.GetType().GetProperties())
            {
                var value = property.GetValue(donation);
                if (value is string)
                {
                    bool valid = ContainsOnlyHebrowOrEnglishLetters((string)value);
                    if (!valid) return false;

                }
            }
            return true;
        }
      
        private bool ContainsOnlyHebrowOrEnglishLetters(string input)
        {
            if (input == null) return true;
            Regex regex = new Regex(@"^[a-zA-Zא-ת]*$");
            return regex.IsMatch(input);
        }

        private void sendEmail(BlDonation blDonation)
        {

            string currentDate = DateTime.Now.ToString("yyyy-MM-dd");
            string emailBody = $"A donation was received by you in the amount: {blDonation.DonationAmount} in the date {currentDate}";
            
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("savannah22@ethereal.email"));
            email.To.Add(MailboxAddress.Parse("rossie.heller38@ethereal.email"));
            email.Subject = "בדיקה!!";
            email.Body = new TextPart(TextFormat.Plain) { Text = emailBody };

            var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("savannah22@ethereal.email ", "Upa6mqdANsnuDN4Dmf");
            smtp.Send(email);
            smtp.Disconnect(true);
        }

    }

}