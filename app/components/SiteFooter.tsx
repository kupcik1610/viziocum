'use client';

import { usePathname } from 'next/navigation';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2631.091938864761!2d19.15676317707685!3d48.74194050889354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715170e73e5076d%3A0x2624ce1a7cc30050!2sMedic%C3%ADnske%20centrum%20ZDRAVOMED%202!5e0!3m2!1sen!2ssk!4v1695687106959!5m2!1sen!2ssk';

export default function SiteFooter() {
  const pathname = usePathname() || '/';
  const isEn = pathname === '/en' || pathname.startsWith('/en/');

  return (
    <>
      <section id="sp-bottom">
        <div className="container">
          <div className="container-inner">
            <div className="row">
              <div id="sp-bottom1" className="col-sm-6 col-lg-3">
                <div className="sp-column">
                  <div className="sp-module">
                    <h3 className="sp-module-title">Informácie</h3>
                    <div className="sp-module-content">
                      <div className="mod-custom custom">
                        <p>
                          <strong>Poskytovateľ zdravotnej starostlivosti:</strong>
                          <br />
                          Viziocum, s.r.o.
                          <br />
                          Zelená 4453/2C
                          <br />
                          Banská Bystrica 974 04
                          <br />
                          IČO: 55 206 832{' '}
                        </p>
                        <p>
                          <strong>Ambulancia v obore: </strong>Oftalmológia
                        </p>
                        <p>
                          <strong>
                            Identifikátor zdravotného zariadenia (IDZZ, IČO):
                          </strong>{' '}
                          55 206 832
                        </p>
                        <p>
                          <strong>Miesto prevádzkovania:</strong> Cesta k nemocnici 1,
                          97401 Banská Bystrica{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="sp-bottom2" className="col-sm-6 col-lg-3">
                <div className="sp-column">
                  <div className="sp-module">
                    <h3 className="sp-module-title">{isEn ? 'Contact' : 'Kontakt'}</h3>
                    <div className="sp-module-content">
                      <div className="mod-custom custom">
                        <p>
                          Oftalmologická glaukómová a neurooftalmologická ambulancia
                          Banská Bystrica
                        </p>
                        <div>MUDr. Mária Praženicová</div>
                        <div>Zdravomed 2</div>
                        <div>Ambulancia č. 3.1</div>
                        <div>Cesta k nemocnici 1</div>
                        <hr />
                        <div>
                          <span className="fas fa-mobile-alt" aria-hidden="true">
                            &nbsp;
                          </span>
                          <a href="tel:+421907406373">+421 907 406 373</a>
                        </div>
                        <div>
                          <span className="fas fa-at" aria-hidden="true">
                            &nbsp;
                          </span>
                          <a href="mailto:viziocum@viziocum.sk">viziocum@viziocum.sk</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="sp-bottom3" className="col-lg-3">
                <div className="sp-column">
                  <div className="sp-module">
                    <h3 className="sp-module-title">Nájdete nás</h3>
                    <div className="sp-module-content">
                      <iframe
                        src={MAP_SRC}
                        width="100%"
                        height={200}
                        loading="lazy"
                        title="Nájdete nás"
                        className="mod-wrapper wrapper"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div id="sp-bottom4" className="col-lg-3">
                <div className="sp-column">
                  <div className="sp-module">
                    <h3 className="sp-module-title">Odkazy</h3>
                    <div className="sp-module-content">
                      <div className="mod-custom custom">
                        <p>
                          <a href="https://www.ocnytlak.sk/" target="_blank" rel="noopener noreferrer">
                            www.ocnytlak.sk
                          </a>
                          <br />
                          <a href="https://eyetronic-therapie.de/en/" target="_blank" rel="noopener noreferrer">
                            www.eyetronic-therapie.de
                          </a>
                          <br />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="sp-module">
                    <h3 className="sp-module-title">Blog</h3>
                    <div className="sp-module-content">
                      <ul className="latestnews">
                        <li>
                          <a href="/blog/ochorenia/glaukom/">
                            Glaukóm <span>29. september 2023</span>
                          </a>
                        </li>
                        <li>
                          <a href="/blog/ochorenia/retinitis-pigmentosa/">
                            Retinitis pigmentosa <span>29. september 2023</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="sp-footer">
        <div className="container">
          <div className="container-inner">
            <div className="row">
              <div id="sp-footer1" className="col-lg-12">
                <div className="sp-column">
                  <span className="sp-copyright">© 2026 Viziocum s.r.o.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
