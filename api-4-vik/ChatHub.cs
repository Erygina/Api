using Microsoft.AspNetCore.SignalR;

namespace api4_signalR_vik
{
    public class ChatHub : Hub
    {

       
    public string CalcIMT(string weight, string height)   // method
        {
            var weight2 = double.Parse(weight);
            var height2 = double.Parse(height);
            double imt = Math.Round(weight2 / ((height2 / 100) * (height2 / 100)), 2);
            var message = "";
            if (imt <= 16) { message = "Выраженный дефицит массы тела"; }
            if (imt > 16 && imt <= 18.5) { message = "Недостаточная(дефицит) масса тела"; }
            if (imt > 18.5 && imt <= 25) { message = "Норма"; }
            if (imt > 25 && imt <= 30) { message = "Избыточная масса тела(предожирение)"; }
            if (imt > 30 && imt <= 35) { message = "Ожирение первой степени"; }
            if (imt > 35 && imt <= 40) { message = "Ожирение второй степени"; }
            if (imt > 40) { message = "Ожирение третьей степени(морбидное)"; }

            
            return imt.ToString() + " - " + message;
        }
       
        
        public async Task Send(string weight, string height)
        {
            await this.Clients.All.SendAsync("Receive", CalcIMT(weight, height));
        }
    }
}
