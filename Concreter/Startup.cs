using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Concreter.Startup))]
namespace Concreter
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
