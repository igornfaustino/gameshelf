import React from 'react';

type Props = {
  size: string;
};

const Bookshelf = ({ size }: Props) => {
  return (
    <svg height={size} viewBox="0 0 48 58" width={size} xmlns="http://www.w3.org/2000/svg">
      <g id="Page-1" fill="none" fillRule="evenodd">
        <g id="019---Book-Shelf" fillRule="nonzero">
          <path
            id="Shape"
            d="m46 0h-44c-1.10320187.0032948-1.9967052.89679813-2 2v50c.0032948 1.1032019.89679813 1.9967052 2 2h44c1.1032019-.0032948 1.9967052-.8967981 2-2v-50c-.0032948-1.10320187-.8967981-1.9967052-2-2zm-2 49c0 .5522847-.4477153 1-1 1h-38c-.55228475 0-1-.4477153-1-1v-10c0-.5522847.44771525-1 1-1h38c.5522847 0 1 .4477153 1 1zm0-17c0 .5522847-.4477153 1-1 1h-38c-.55228475 0-1-.4477153-1-1v-10c0-.5522847.44771525-1 1-1h38c.5522847 0 1 .4477153 1 1zm0-17c0 .5522847-.4477153 1-1 1h-38c-.55228475 0-1-.4477153-1-1v-10c0-.55228475.44771525-1 1-1h38c.5522847 0 1 .44771525 1 1z"
            fill="#a46a43"
          />
          <g fill="#603e26">
            <rect id="Rectangle-path" height="12" rx="1" width="40" x="4" y="4" />
            <rect id="Rectangle-path" height="12" rx="1" width="40" x="4" y="21" />
            <rect id="Rectangle-path" height="12" rx="1" width="40" x="4" y="38" />
          </g>
          <path
            id="Shape"
            d="m2 54h6v1c0 1.6568542-1.34314575 3-3 3s-3-1.3431458-3-3z"
            fill="#b08f46"
          />
          <path
            id="Shape"
            d="m40 54h6v1c0 1.6568542-1.3431458 3-3 3s-3-1.3431458-3-3z"
            fill="#b08f46"
          />
          <rect id="Rectangle-path" fill="#ff5364" height="8" rx="1" width="4" x="8" y="8" />
          <rect id="Rectangle-path" fill="#efc319" height="8" rx="1" width="4" x="12" y="8" />
          <rect id="Rectangle-path" fill="#f19b1f" height="8" rx="1" width="4" x="16" y="8" />
          <rect id="Rectangle-path" fill="#3b96d2" height="8" rx="1" width="4" x="8" y="25" />
          <rect id="Rectangle-path" fill="#efc319" height="12" rx="1" width="4" x="12" y="21" />
          <rect id="Rectangle-path" fill="#26b899" height="8" rx="1" width="4" x="16" y="25" />
          <rect id="Rectangle-path" fill="#f19b1f" height="12" rx="1" width="4" x="20" y="21" />
          <rect id="Rectangle-path" fill="#ff5364" height="8" rx="1" width="4" x="24" y="25" />
          <rect id="Rectangle-path" fill="#3b96d2" height="12" rx="1" width="4" x="24" y="38" />
          <rect id="Rectangle-path" fill="#efc319" height="8" rx="1" width="4" x="28" y="42" />
          <rect id="Rectangle-path" fill="#f19b1f" height="12" rx="1" width="4" x="32" y="38" />
          <rect id="Rectangle-path" fill="#26b899" height="8" rx="1" width="4" x="36" y="42" />
          <path
            id="Shape"
            d="m29.89 13.41-.844 1.669c-.1222278.241595-.3371971.4233017-.5957735.5035885-.2585765.0802869-.5386574.0522911-.7762265-.0775885l-7.184-3.925c-.3058821-.1827575-.4922677-.5136869-.49-.87.0020217-.1564066.0396397-.3102984.11-.45l.87-1.74c.1116625-.22507518.3094694-.39553251.5485699-.47272244.2391005-.07718994.4992385-.05457307.7214301.06272244l7.25 3.98c.4602992.2663097.6316581.8462938.39 1.32z"
            fill="#3b96d2"
          />
          <path
            id="Shape"
            d="m24 44.71c.0022677.3563131-.1841179.6872425-.49.87l-7.184 3.925c-.2375691.1298796-.51765.1578754-.7762265.0775885-.2585764-.0802868-.4735457-.2619935-.5957735-.5035885l-.844-1.669c-.2416581-.4737062-.0702992-1.0536903.39-1.32l7.25-3.98c.2221916-.1172955.4823296-.1399124.7214301-.0627224.2391005.0771899.4369074.2476472.5485699.4727224l.87 1.74c.0703603.1397016.1079783.2935934.11.45z"
            fill="#ff5364"
          />
        </g>
      </g>
    </svg>
  );
};

export default Bookshelf;
